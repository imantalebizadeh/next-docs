export type Template = {
  id: number;
  title: string;
  image: string;
  initialContent?: string;
};

export const templates: Template[] = [
  {
    id: 1,
    title: "Blank Document",
    image: "/svg/blank-document.svg",
  },
  {
    id: 2,
    title: "Business Letter",
    image: "/svg/business-letter.svg",
    initialContent: `
      <p style="margin-bottom: 16px;"><strong>[Your Company Name]</strong><br>
      [Your Address]<br>
      [City, State ZIP Code]<br>
      [Phone Number]<br>
      [Email Address]</p>

      <p style="margin-bottom: 16px;">[Date]</p>

      <p style="margin-bottom: 16px;"><strong>[Recipient Name]</strong><br>
      [Recipient Title]<br>
      [Company Name]<br>
      [Address]<br>
      [City, State ZIP Code]</p>

      <p style="margin-bottom: 16px;">Dear [Recipient Name],</p>

      <p style="margin-bottom: 16px;">I am writing to [state the purpose of your letter]. [Provide context or background information relevant to your message].</p>

      <p style="margin-bottom: 16px;">[In this paragraph, elaborate on the main points you wish to convey. Be clear and concise, providing any necessary details or supporting information].</p>

      <p style="margin-bottom: 16px;">[Conclude with a call to action or next steps. Express appreciation for their time and consideration].</p>

      <p style="margin-bottom: 16px;">Sincerely,</p>

      <p style="margin-bottom: 0;">[Your Full Name]<br>
      [Your Title]<br>
      [Your Company]</p>
    `,
  },
  {
    id: 3,
    title: "Cover Letter",
    image: "/svg/cover-letter.svg",
    initialContent: `
      <p style="margin-bottom: 16px;">[Your Name]<br>
      [Your Address]<br>
      [City, State ZIP Code]<br>
      [Your Email]<br>
      [Your Phone Number]</p>

      <p style="margin-bottom: 16px;">[Date]</p>

      <p style="margin-bottom: 16px;">[Hiring Manager's Name]<br>
      [Company Name]<br>
      [Company Address]<br>
      [City, State ZIP Code]</p>

      <p style="margin-bottom: 16px;">Dear [Hiring Manager's Name],</p>

      <p style="margin-bottom: 16px;">I am writing to express my strong interest in the <strong>[Job Title]</strong> position at <strong>[Company Name]</strong>. With my background in [relevant field/skill], I am confident that I would be a valuable addition to your team.</p>

      <p style="margin-bottom: 16px;">In my current role at [Current/Previous Company], I have [describe a relevant achievement or responsibility]. This experience has equipped me with [relevant skills] that align perfectly with the requirements of this position.</p>

      <p style="margin-bottom: 16px;">I am particularly drawn to [Company Name] because [reason why you're interested in the company]. I am excited about the opportunity to contribute to [specific project, goal, or value of the company].</p>

      <p style="margin-bottom: 16px;">I would welcome the opportunity to discuss how my skills and experiences align with your needs. Thank you for considering my application. I look forward to hearing from you.</p>

      <p style="margin-bottom: 16px;">Sincerely,</p>

      <p style="margin-bottom: 0;">[Your Full Name]</p>
    `,
  },
  {
    id: 4,
    title: "Letter",
    image: "/svg/letter.svg",
    initialContent: `
      <p style="margin-bottom: 16px;">[Your Name]<br>
      [Your Address]<br>
      [City, State ZIP Code]</p>

      <p style="margin-bottom: 16px;">[Date]</p>

      <p style="margin-bottom: 16px;">Dear [Recipient's Name],</p>

      <p style="margin-bottom: 16px;">[Opening paragraph: Introduce yourself if necessary and state the purpose of your letter. Make it engaging and set the tone for the rest of the letter].</p>

      <p style="margin-bottom: 16px;">[Body paragraph(s): Expand on your main message. Share your thoughts, news, or information you wish to convey. Be personal and genuine in your expression].</p>

      <p style="margin-bottom: 16px;">[Closing paragraph: Summarize your main points if needed. Include any requests or calls to action. Express your wishes or hopes for the recipient].</p>

      <p style="margin-bottom: 16px;">Warm regards,</p>

      <p style="margin-bottom: 0;">[Your Name]</p>
    `,
  },
  {
    id: 5,
    title: "Project Proposal",
    image: "/svg/project-proposal.svg",
    initialContent: `
      <h1 style="font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 8px;">[Project Title]</h1>
      <p style="text-align: center; color: #666; margin-bottom: 24px;">Project Proposal</p>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 4px; margin-bottom: 12px;">Executive Summary</h2>
      <p style="margin-bottom: 16px;">[Provide a brief overview of the project, its objectives, and expected outcomes. This section should capture the essence of the proposal in 2-3 sentences].</p>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 4px; margin-bottom: 12px;">Problem Statement</h2>
      <p style="margin-bottom: 16px;">[Describe the problem or opportunity that this project addresses. Explain why it's important and what happens if it's not addressed].</p>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 4px; margin-bottom: 12px;">Proposed Solution</h2>
      <p style="margin-bottom: 16px;">[Detail your proposed solution. Explain how it addresses the problem and why this approach was chosen].</p>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 4px; margin-bottom: 12px;">Project Scope</h2>
      <ul style="margin-bottom: 16px; padding-left: 24px;">
        <li>[Deliverable 1]</li>
        <li>[Deliverable 2]</li>
        <li>[Deliverable 3]</li>
      </ul>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 4px; margin-bottom: 12px;">Timeline</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr style="background-color: #f5f5f5;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Phase</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Duration</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Deliverables</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Phase 1</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[Duration]</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[Deliverables]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Phase 2</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[Duration]</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[Deliverables]</td>
        </tr>
      </table>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 4px; margin-bottom: 12px;">Budget</h2>
      <p style="margin-bottom: 16px;">[Provide a high-level budget breakdown or total estimated cost].</p>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 4px; margin-bottom: 12px;">Conclusion</h2>
      <p style="margin-bottom: 0;">[Summarize the key points and reiterate the value this project will bring. Include a call to action].</p>
    `,
  },
  {
    id: 6,
    title: "Resume",
    image: "/svg/resume.svg",
    initialContent: `
      <h1 style="font-size: 32px; font-weight: bold; text-align: center; margin-bottom: 4px;">[Your Full Name]</h1>
      <p style="text-align: center; color: #555; margin-bottom: 20px;">[Your Address] | [Phone Number] | [Email] | [LinkedIn URL]</p>

      <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #2563eb; color: #2563eb; padding-bottom: 4px; margin-bottom: 12px;">Professional Summary</h2>
      <p style="margin-bottom: 20px;">[Write 2-3 sentences summarizing your professional background, key skills, and career objectives. Tailor this to the position you're applying for].</p>

      <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #2563eb; color: #2563eb; padding-bottom: 4px; margin-bottom: 12px;">Experience</h2>
      
      <p style="margin-bottom: 4px;"><strong>[Job Title]</strong> | [Company Name]</p>
      <p style="color: #666; font-style: italic; margin-bottom: 8px;">[Start Date] - [End Date] | [Location]</p>
      <ul style="margin-bottom: 16px; padding-left: 24px;">
        <li>[Achievement or responsibility with quantifiable results]</li>
        <li>[Achievement or responsibility with quantifiable results]</li>
        <li>[Achievement or responsibility with quantifiable results]</li>
      </ul>

      <p style="margin-bottom: 4px;"><strong>[Job Title]</strong> | [Company Name]</p>
      <p style="color: #666; font-style: italic; margin-bottom: 8px;">[Start Date] - [End Date] | [Location]</p>
      <ul style="margin-bottom: 20px; padding-left: 24px;">
        <li>[Achievement or responsibility with quantifiable results]</li>
        <li>[Achievement or responsibility with quantifiable results]</li>
      </ul>

      <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #2563eb; color: #2563eb; padding-bottom: 4px; margin-bottom: 12px;">Education</h2>
      <p style="margin-bottom: 4px;"><strong>[Degree]</strong> in [Field of Study]</p>
      <p style="color: #666; margin-bottom: 20px;">[University Name] | [Graduation Year]</p>

      <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #2563eb; color: #2563eb; padding-bottom: 4px; margin-bottom: 12px;">Skills</h2>
      <p style="margin-bottom: 0;"><strong>Technical:</strong> [Skill 1], [Skill 2], [Skill 3], [Skill 4]<br>
      <strong>Languages:</strong> [Language 1], [Language 2]<br>
      <strong>Soft Skills:</strong> [Skill 1], [Skill 2], [Skill 3]</p>
    `,
  },
  {
    id: 7,
    title: "Software Proposal",
    image: "/svg/software-proposal.svg",
    initialContent: `
      <h1 style="font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 8px;">[Software Project Name]</h1>
      <p style="text-align: center; color: #666; margin-bottom: 24px;">Software Development Proposal</p>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #0ea5e9; color: #0ea5e9; padding-bottom: 4px; margin-bottom: 12px;">1. Introduction</h2>
      <p style="margin-bottom: 16px;">[Provide an overview of the software project. Describe the client's needs and how this software solution will address them].</p>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #0ea5e9; color: #0ea5e9; padding-bottom: 4px; margin-bottom: 12px;">2. Project Objectives</h2>
      <ul style="margin-bottom: 16px; padding-left: 24px;">
        <li>[Primary objective of the software]</li>
        <li>[Secondary objective]</li>
        <li>[Additional goals]</li>
      </ul>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #0ea5e9; color: #0ea5e9; padding-bottom: 4px; margin-bottom: 12px;">3. Technical Specifications</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr style="background-color: #f0f9ff;">
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; width: 30%;">Platform</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[Web/Mobile/Desktop]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Frontend</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[Technologies]</td>
        </tr>
        <tr style="background-color: #f0f9ff;">
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Backend</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[Technologies]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Database</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[Database system]</td>
        </tr>
      </table>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #0ea5e9; color: #0ea5e9; padding-bottom: 4px; margin-bottom: 12px;">4. Features & Functionality</h2>
      <h3 style="font-size: 15px; font-weight: bold; margin-bottom: 8px;">Core Features</h3>
      <ul style="margin-bottom: 12px; padding-left: 24px;">
        <li>[Feature 1 with brief description]</li>
        <li>[Feature 2 with brief description]</li>
        <li>[Feature 3 with brief description]</li>
      </ul>
      <h3 style="font-size: 15px; font-weight: bold; margin-bottom: 8px;">Additional Features</h3>
      <ul style="margin-bottom: 16px; padding-left: 24px;">
        <li>[Optional feature 1]</li>
        <li>[Optional feature 2]</li>
      </ul>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #0ea5e9; color: #0ea5e9; padding-bottom: 4px; margin-bottom: 12px;">5. Development Timeline</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr style="background-color: #0ea5e9; color: white;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Phase</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Duration</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Deliverables</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Discovery & Planning</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[X weeks]</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Requirements, Wireframes</td>
        </tr>
        <tr style="background-color: #f0f9ff;">
          <td style="border: 1px solid #ddd; padding: 8px;">Design</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[X weeks]</td>
          <td style="border: 1px solid #ddd; padding: 8px;">UI/UX Designs, Prototypes</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Development</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[X weeks]</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Working Software</td>
        </tr>
        <tr style="background-color: #f0f9ff;">
          <td style="border: 1px solid #ddd; padding: 8px;">Testing & QA</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[X weeks]</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Bug-free Release</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Deployment</td>
          <td style="border: 1px solid #ddd; padding: 8px;">[X weeks]</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Live Application</td>
        </tr>
      </table>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #0ea5e9; color: #0ea5e9; padding-bottom: 4px; margin-bottom: 12px;">6. Investment</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr style="background-color: #f5f5f5;">
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Development Cost</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$[Amount]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Maintenance (Annual)</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$[Amount]</td>
        </tr>
        <tr style="background-color: #0ea5e9; color: white;">
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Total</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">$[Amount]</td>
        </tr>
      </table>

      <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #0ea5e9; color: #0ea5e9; padding-bottom: 4px; margin-bottom: 12px;">7. Next Steps</h2>
      <p style="margin-bottom: 0;">To proceed with this project, please [describe the next steps - signing agreement, initial payment, kickoff meeting, etc.]. We are excited to partner with you on this software development project.</p>
    `,
  },
];
