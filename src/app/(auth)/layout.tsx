export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-svh items-center justify-center">{children}</div>
  );
}
