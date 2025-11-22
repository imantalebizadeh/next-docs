"use client";

import {
  type ChangeEvent,
  type ComponentProps,
  type ComponentRef,
  createContext,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  use,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { Slot as SlotPrimitive } from "radix-ui";

import { VisuallyHiddenInput } from "@/components/ui/visually-hidden-input";

import { useComposedRefs } from "@/lib/compose-refs";
import { cn } from "@/lib/utils";

const ROOT_NAME = "Editable";
const LABEL_NAME = "EditableLabel";
const AREA_NAME = "EditableArea";
const PREVIEW_NAME = "EditablePreview";
const INPUT_NAME = "EditableInput";
const TRIGGER_NAME = "EditableTrigger";
const TOOLBAR_NAME = "EditableToolbar";
const CANCEL_NAME = "EditableCancel";
const SUBMIT_NAME = "EditableSubmit";

type Direction = "ltr" | "rtl";

const DirectionContext = createContext<Direction | undefined>(undefined);

function useDirection(dirProp?: Direction): Direction {
  const contextDir = use(DirectionContext);
  return dirProp ?? contextDir ?? "ltr";
}

function useLazyRef<T>(fn: () => T) {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = fn();
  }

  return ref as RefObject<T>;
}

interface StoreState {
  value: string;
  editing: boolean;
}

interface Store {
  subscribe: (callback: () => void) => () => void;
  getState: () => StoreState;
  setState: <K extends keyof StoreState>(key: K, value: StoreState[K]) => void;
  notify: () => void;
}

function createStore(
  listenersRef: RefObject<Set<() => void>>,
  stateRef: RefObject<StoreState>,
  onValueChange?: (value: string) => void,
  onEditingChange?: (editing: boolean) => void
): Store {
  const store: Store = {
    subscribe: (cb) => {
      if (listenersRef.current) {
        listenersRef.current.add(cb);
        return () => listenersRef.current?.delete(cb);
      }
      return () => {
        return;
      };
    },
    getState: () =>
      stateRef.current ?? {
        value: "",
        editing: false,
      },
    setState: (key, value) => {
      const state = stateRef.current;
      if (!state || Object.is(state[key], value)) {
        return;
      }

      if (key === "value" && typeof value === "string") {
        state.value = value;
        onValueChange?.(value);
      } else if (key === "editing" && typeof value === "boolean") {
        state.editing = value;
        onEditingChange?.(value);
      } else {
        state[key] = value;
      }

      store.notify();
    },
    notify: () => {
      if (listenersRef.current) {
        for (const cb of listenersRef.current) {
          cb();
        }
      }
    },
  };

  return store;
}

const StoreContext = createContext<Store | null>(null);

function useStoreContext(consumerName: string) {
  const context = use(StoreContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}

function useStore<T>(selector: (state: StoreState) => T): T {
  const store = useStoreContext("useStore");

  const getSnapshot = useCallback(
    () => selector(store.getState()),
    [store, selector]
  );

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

interface EditableContextValue {
  id: string;
  inputId: string;
  labelId: string;
  defaultValue: string;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: (value: string) => void;
  onEnterKeyDown?: (event: KeyboardEvent) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  dir?: Direction;
  maxLength?: number;
  placeholder?: string;
  triggerMode: "click" | "dblclick" | "focus";
  autosize: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
}

const EditableContext = createContext<EditableContextValue | null>(null);

function useEditableContext(consumerName: string) {
  const context = use(EditableContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}

type RootElement = ComponentRef<typeof EditableRoot>;

interface EditableRootProps extends Omit<ComponentProps<"div">, "onSubmit"> {
  id?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultEditing?: boolean;
  editing?: boolean;
  onEditingChange?: (editing: boolean) => void;
  onCancel?: () => void;
  onEdit?: () => void;
  onSubmit?: (value: string) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onEnterKeyDown?: (event: KeyboardEvent) => void;
  dir?: Direction;
  maxLength?: number;
  name?: string;
  placeholder?: string;
  triggerMode?: EditableContextValue["triggerMode"];
  asChild?: boolean;
  autosize?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
}

function EditableRoot(props: EditableRootProps) {
  const {
    value,
    defaultValue,
    defaultEditing,
    editing,
    onValueChange,
    onEditingChange,
    ...rootProps
  } = props;

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<StoreState>(() => ({
    value: value ?? defaultValue ?? "",
    editing: editing ?? defaultEditing ?? false,
  }));

  const store = useMemo(
    () => createStore(listenersRef, stateRef, onValueChange, onEditingChange),
    [listenersRef, stateRef, onValueChange, onEditingChange]
  );

  return (
    <StoreContext.Provider value={store}>
      <EditableRootImpl
        value={value}
        defaultValue={defaultValue}
        editing={editing}
        {...rootProps}
      />
    </StoreContext.Provider>
  );
}

function EditableRootImpl(
  props: Omit<EditableRootProps, "onValueChange" | "onEditingChange">
) {
  const {
    defaultValue = "",
    value: valueProp,
    editing: editingProp,
    onCancel: onCancelProp,
    onEdit: onEditProp,
    onSubmit: onSubmitProp,
    onEscapeKeyDown,
    onEnterKeyDown,
    id: idProp,
    dir: dirProp,
    maxLength,
    name,
    placeholder,
    triggerMode = "click",
    asChild,
    autosize = false,
    disabled,
    required,
    readOnly,
    invalid,
    className,
    ref,
    ...rootProps
  } = props;

  const rootId = useId();
  const inputId = useId();
  const labelId = useId();

  const id = idProp ?? rootId;

  const dir = useDirection(dirProp);
  const store = useStoreContext(ROOT_NAME);

  const previousValueRef = useRef(defaultValue);

  useEffect(() => {
    if (valueProp !== undefined) {
      store.setState("value", valueProp);
    }
  }, [valueProp, store]);

  useEffect(() => {
    if (editingProp !== undefined) {
      store.setState("editing", editingProp);
    }
  }, [editingProp, store]);

  const [formTrigger, setFormTrigger] = useState<RootElement | null>(null);
  const composedRef = useComposedRefs(ref, (node) => setFormTrigger(node));
  const isFormControl = formTrigger ? !!formTrigger.closest("form") : true;

  const onCancel = useCallback(() => {
    const prevValue = previousValueRef.current;
    store.setState("value", prevValue);
    store.setState("editing", false);
    onCancelProp?.();
  }, [store, onCancelProp]);

  const onEdit = useCallback(() => {
    const currentValue = store.getState().value;
    previousValueRef.current = currentValue;
    store.setState("editing", true);
    onEditProp?.();
  }, [store, onEditProp]);

  const onSubmit = useCallback(
    (newValue: string) => {
      store.setState("value", newValue);
      store.setState("editing", false);
      onSubmitProp?.(newValue);
    },
    [store, onSubmitProp]
  );

  const contextValue = useMemo<EditableContextValue>(
    () => ({
      id,
      inputId,
      labelId,
      defaultValue,
      onSubmit,
      onEdit,
      onCancel,
      onEscapeKeyDown,
      onEnterKeyDown,
      dir,
      maxLength,
      placeholder,
      triggerMode,
      autosize,
      disabled,
      readOnly,
      required,
      invalid,
    }),
    [
      id,
      inputId,
      labelId,
      defaultValue,
      onSubmit,
      onCancel,
      onEdit,
      onEscapeKeyDown,
      onEnterKeyDown,
      dir,
      maxLength,
      placeholder,
      triggerMode,
      autosize,
      disabled,
      required,
      readOnly,
      invalid,
    ]
  );

  const value = useStore((state) => state.value);

  const RootPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <EditableContext.Provider value={contextValue}>
      <RootPrimitive
        data-slot="editable"
        {...rootProps}
        id={id}
        ref={composedRef}
        className={cn("flex min-w-0 flex-col gap-2", className)}
      />
      {isFormControl && (
        <VisuallyHiddenInput
          type="hidden"
          control={formTrigger}
          name={name}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      )}
    </EditableContext.Provider>
  );
}

interface EditableLabelProps extends ComponentProps<"label"> {
  asChild?: boolean;
}

function EditableLabel(props: EditableLabelProps) {
  const { asChild, className, children, ref, ...labelProps } = props;
  const context = useEditableContext(LABEL_NAME);

  const LabelPrimitive = asChild ? SlotPrimitive.Slot : "label";

  return (
    <LabelPrimitive
      data-disabled={context.disabled ? "" : undefined}
      data-invalid={context.invalid ? "" : undefined}
      data-required={context.required ? "" : undefined}
      data-slot="editable-label"
      {...labelProps}
      ref={ref}
      id={context.labelId}
      htmlFor={context.inputId}
      className={cn(
        "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-required:after:ml-0.5 data-required:after:text-destructive data-required:after:content-['*']",
        className
      )}
    >
      {children}
    </LabelPrimitive>
  );
}

interface EditableAreaProps extends ComponentProps<"div"> {
  asChild?: boolean;
}

function EditableArea(props: EditableAreaProps) {
  const { asChild, className, ref, ...areaProps } = props;
  const context = useEditableContext(AREA_NAME);
  const editing = useStore((state) => state.editing);

  const AreaPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <AreaPrimitive
      role="group"
      data-disabled={context.disabled ? "" : undefined}
      data-editing={editing ? "" : undefined}
      data-slot="editable-area"
      dir={context.dir}
      {...areaProps}
      ref={ref}
      className={cn(
        "relative inline-block min-w-0 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
    />
  );
}

interface EditablePreviewProps extends ComponentProps<"div"> {
  asChild?: boolean;
}

function EditablePreview(props: EditablePreviewProps) {
  const { asChild, className, ref, ...previewProps } = props;
  const context = useEditableContext(PREVIEW_NAME);
  const value = useStore((state) => state.value);
  const editing = useStore((state) => state.editing);

  const onTrigger = useCallback(() => {
    if (context.disabled || context.readOnly) {
      return;
    }
    context.onEdit();
  }, [context.onEdit, context.disabled, context.readOnly]);

  const onClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      previewProps.onClick?.(event);
      if (event.defaultPrevented || context.triggerMode !== "click") {
        return;
      }

      onTrigger();
    },
    [previewProps.onClick, onTrigger, context.triggerMode]
  );

  const onDoubleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      previewProps.onDoubleClick?.(event);
      if (event.defaultPrevented || context.triggerMode !== "dblclick") {
        return;
      }

      onTrigger();
    },
    [previewProps.onDoubleClick, onTrigger, context.triggerMode]
  );

  const onFocus = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      previewProps.onFocus?.(event);
      if (event.defaultPrevented || context.triggerMode !== "focus") {
        return;
      }

      onTrigger();
    },
    [previewProps.onFocus, onTrigger, context.triggerMode]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      previewProps.onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "Enter") {
        if (context.onEnterKeyDown) {
          context.onEnterKeyDown(event);
          if (event.defaultPrevented) {
            return;
          }
        }
        onTrigger();
      }
    },
    [previewProps.onKeyDown, onTrigger, context.onEnterKeyDown]
  );

  const PreviewPrimitive = asChild ? SlotPrimitive.Slot : "div";

  if (editing || context.readOnly) {
    return null;
  }

  return (
    <PreviewPrimitive
      role="button"
      aria-disabled={context.disabled || context.readOnly}
      data-empty={value ? undefined : ""}
      data-disabled={context.disabled ? "" : undefined}
      data-readonly={context.readOnly ? "" : undefined}
      data-slot="editable-preview"
      tabIndex={context.disabled || context.readOnly ? undefined : 0}
      {...previewProps}
      ref={ref}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      className={cn(
        "cursor-text truncate rounded-sm border border-transparent py-1 text-base focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring data-disabled:cursor-not-allowed data-readonly:cursor-default data-empty:text-muted-foreground data-disabled:opacity-50 md:text-sm",
        className
      )}
    >
      {value || context.placeholder}
    </PreviewPrimitive>
  );
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type InputElement = ComponentRef<typeof EditableInput>;

interface EditableInputProps extends ComponentProps<"input"> {
  asChild?: boolean;
  maxLength?: number;
}

function EditableInput(props: EditableInputProps) {
  const {
    asChild,
    className,
    disabled,
    readOnly,
    required,
    maxLength,
    ref,
    ...inputProps
  } = props;
  const context = useEditableContext(INPUT_NAME);
  const store = useStoreContext(INPUT_NAME);
  const value = useStore((state) => state.value);
  const editing = useStore((state) => state.editing);
  const inputRef = useRef<InputElement>(null);
  const composedRef = useComposedRefs(ref, inputRef);

  const isDisabled = disabled || context.disabled;
  const isReadOnly = readOnly || context.readOnly;
  const isRequired = required || context.required;

  const onAutosize = useCallback(
    (target: InputElement) => {
      if (!context.autosize) {
        return;
      }

      if (target instanceof HTMLTextAreaElement) {
        target.style.height = "0";
        target.style.height = `${target.scrollHeight}px`;
      } else {
        target.style.width = "0";
        target.style.width = `${target.scrollWidth + 4}px`;
      }
    },
    [context.autosize]
  );

  const onBlur = useCallback(
    (event: FocusEvent<InputElement>) => {
      if (isDisabled || isReadOnly) {
        return;
      }

      inputProps.onBlur?.(event);
      if (event.defaultPrevented) {
        return;
      }

      const relatedTarget = event.relatedTarget;

      const isAction =
        relatedTarget instanceof HTMLElement &&
        (relatedTarget.closest(`[data-slot="editable-trigger"]`) ||
          relatedTarget.closest(`[data-slot="editable-cancel"]`));

      if (!isAction) {
        context.onSubmit(value);
      }
    },
    [value, context.onSubmit, inputProps.onBlur, isDisabled, isReadOnly]
  );

  const onChange = useCallback(
    (event: ChangeEvent<InputElement>) => {
      if (isDisabled || isReadOnly) {
        return;
      }

      inputProps.onChange?.(event);
      if (event.defaultPrevented) {
        return;
      }

      store.setState("value", event.target.value);
      onAutosize(event.target);
    },
    [store, inputProps.onChange, onAutosize, isDisabled, isReadOnly]
  );

  const onKeyDown = useCallback(
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: we need to check the event key
    (event: KeyboardEvent<InputElement>) => {
      if (isDisabled || isReadOnly) {
        return;
      }

      inputProps.onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "Escape") {
        if (context.onEscapeKeyDown) {
          context.onEscapeKeyDown(event);
          if (event.defaultPrevented) {
            return;
          }
        }
        context.onCancel();
      } else if (event.key === "Enter") {
        context.onSubmit(value);
      }
    },
    [
      value,
      context.onSubmit,
      context.onCancel,
      context.onEscapeKeyDown,
      inputProps.onKeyDown,
      isDisabled,
      isReadOnly,
    ]
  );

  useIsomorphicLayoutEffect(() => {
    if (!editing || isDisabled || isReadOnly || !inputRef.current) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.focus();
      inputRef.current.select();
      onAutosize(inputRef.current);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [editing, onAutosize, isDisabled, isReadOnly]);

  const InputPrimitive = asChild ? SlotPrimitive.Slot : "input";

  if (!(editing || isReadOnly)) {
    return null;
  }

  return (
    <InputPrimitive
      aria-required={isRequired}
      aria-invalid={context.invalid}
      data-slot="editable-input"
      dir={context.dir}
      disabled={isDisabled}
      readOnly={isReadOnly}
      required={isRequired}
      {...inputProps}
      id={context.inputId}
      aria-labelledby={context.labelId}
      ref={composedRef}
      maxLength={maxLength}
      placeholder={context.placeholder}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={cn(
        "flex rounded-sm border border-input bg-transparent py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        context.autosize ? "w-auto" : "w-full",
        className
      )}
    />
  );
}

interface EditableTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
  forceMount?: boolean;
}

function EditableTrigger(props: EditableTriggerProps) {
  const { asChild, forceMount = false, ref, ...triggerProps } = props;
  const context = useEditableContext(TRIGGER_NAME);
  const editing = useStore((state) => state.editing);

  const onTrigger = useCallback(() => {
    if (context.disabled || context.readOnly) {
      return;
    }
    context.onEdit();
  }, [context.disabled, context.readOnly, context.onEdit]);

  const TriggerPrimitive = asChild ? SlotPrimitive.Slot : "button";

  if (!forceMount && (editing || context.readOnly)) {
    return null;
  }

  return (
    <TriggerPrimitive
      type="button"
      aria-controls={context.id}
      aria-disabled={context.disabled || context.readOnly}
      data-disabled={context.disabled ? "" : undefined}
      data-readonly={context.readOnly ? "" : undefined}
      data-slot="editable-trigger"
      {...triggerProps}
      ref={ref}
      onClick={context.triggerMode === "click" ? onTrigger : undefined}
      onDoubleClick={context.triggerMode === "dblclick" ? onTrigger : undefined}
    />
  );
}

interface EditableToolbarProps extends ComponentProps<"div"> {
  asChild?: boolean;
  orientation?: "horizontal" | "vertical";
}

function EditableToolbar(props: EditableToolbarProps) {
  const {
    asChild,
    className,
    orientation = "horizontal",
    ref,
    ...toolbarProps
  } = props;
  const context = useEditableContext(TOOLBAR_NAME);

  const ToolbarPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ToolbarPrimitive
      role="toolbar"
      aria-controls={context.id}
      aria-orientation={orientation}
      data-slot="editable-toolbar"
      dir={context.dir}
      {...toolbarProps}
      ref={ref}
      className={cn(
        "flex items-center gap-2",
        orientation === "vertical" && "flex-col",
        className
      )}
    />
  );
}

interface EditableCancelProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

function EditableCancel(props: EditableCancelProps) {
  const { asChild, ref, ...cancelProps } = props;
  const context = useEditableContext(CANCEL_NAME);
  const editing = useStore((state) => state.editing);

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (context.disabled || context.readOnly) {
        return;
      }

      cancelProps.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      context.onCancel();
    },
    [cancelProps.onClick, context.onCancel, context.disabled, context.readOnly]
  );

  const CancelPrimitive = asChild ? SlotPrimitive.Slot : "button";

  if (!(editing || context.readOnly)) {
    return null;
  }

  return (
    <CancelPrimitive
      type="button"
      aria-controls={context.id}
      data-slot="editable-cancel"
      {...cancelProps}
      onClick={onClick}
      ref={ref}
    />
  );
}

interface EditableSubmitProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

function EditableSubmit(props: EditableSubmitProps) {
  const { asChild, ref, ...submitProps } = props;
  const context = useEditableContext(SUBMIT_NAME);
  const value = useStore((state) => state.value);
  const editing = useStore((state) => state.editing);

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (context.disabled || context.readOnly) {
        return;
      }

      submitProps.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      context.onSubmit(value);
    },
    [
      submitProps.onClick,
      context.onSubmit,
      value,
      context.disabled,
      context.readOnly,
    ]
  );

  const SubmitPrimitive = asChild ? SlotPrimitive.Slot : "button";

  if (!(editing || context.readOnly)) {
    return null;
  }

  return (
    <SubmitPrimitive
      type="button"
      aria-controls={context.id}
      data-slot="editable-submit"
      {...submitProps}
      ref={ref}
      onClick={onClick}
    />
  );
}

export {
  EditableRoot as Editable,
  EditableLabel,
  EditableArea,
  EditablePreview,
  EditableInput,
  EditableTrigger,
  EditableToolbar,
  EditableCancel,
  EditableSubmit,
  //
  EditableRoot as Root,
  EditableLabel as Label,
  EditableArea as Area,
  EditablePreview as Preview,
  EditableInput as Input,
  EditableTrigger as Trigger,
  EditableToolbar as Toolbar,
  EditableCancel as Cancel,
  EditableSubmit as Submit,
  //
  useStore as useEditable,
  //
  type EditableRootProps as EditableProps,
};
