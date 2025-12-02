import { LetterTemplate } from '../types';

export const templates: LetterTemplate[] = [
  // --- Cover Letter ---
  {
    id: 'cl-01',
    name: 'Standard Professional Cover Letter',
    description: 'A classic and versatile cover letter template suitable for a wide range of job applications. Clean, professional, and easy to customize.',
    category: 'cover-letter',
    templateString: `[Hiring Manager Name]
[Recipient Address]

Dear [Hiring Manager Name],

I am writing to express my keen interest in the [Job Title] position, which I saw advertised on [Platform where you saw the ad]. With my background in [Your Key Skill/Field] and my experience in [Another Key Skill/Experience], I am confident that I possess the skills and qualifications necessary to excel in this role.

In my previous role, I was responsible for [Briefly describe a key responsibility]. I successfully [Describe a key achievement and quantify it if possible, e.g., "increased sales by 15% in one quarter"]. This experience has equipped me with a strong understanding of [Relevant Industry/Skill], which I am eager to bring to your team.

I am excited by the opportunity to contribute my skills to your organization.

Thank you for considering my application. I have attached my resume for your review and welcome the opportunity to discuss how my skills and experience can benefit your team.

Sincerely,
[Your Name]

[Your Address]
[Your Email] | [Your Phone Number]
[Date]`,
    placeholders: [
      { key: 'Hiring Manager Name', labelKey: 'ph_hiring_manager_name' },
      { key: 'Recipient Address', labelKey: 'ph_recipient_address' },
      { key: 'Job Title', labelKey: 'ph_job_title' },
      { key: 'Platform where you saw the ad', labelKey: 'ph_platform' },
      { key: 'Your Key Skill/Field', labelKey: 'ph_key_skill' },
      { key: 'Another Key Skill/Experience', labelKey: 'ph_another_skill' },
      { key: 'Briefly describe a key responsibility', labelKey: 'ph_responsibility' },
      { key: 'Describe a key achievement and quantify it if possible', labelKey: 'ph_achievement' },
      { key: 'Relevant Industry/Skill', labelKey: 'ph_relevant_industry' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Address', labelKey: 'ph_your_address' },
      { key: 'Your Email', labelKey: 'ph_your_email' },
      { key: 'Your Phone Number', labelKey: 'ph_your_phone' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  // --- Business ---
  { 
    id: 'biz-01', 
    name: 'General Business Inquiry', 
    description: 'A formal template for making general business inquiries, such as requesting information about services or products.', 
    category: 'business', 
    templateString: `[Recipient Name]
[Recipient Address]

Dear [Recipient Name],

I am writing to [State the purpose of the letter, e.g., inquire about your services, confirm our recent discussion regarding..., etc.].

[Provide the main details in the first body paragraph. Be clear and concise.]

[Use a second paragraph to provide further details, context, or supporting information. Keep paragraphs focused on a single topic.]

[In the concluding paragraph, summarize your main point and state the desired outcome or next steps. For example, "I look forward to your response," or "Please let me know if you require any further information."]

Sincerely,
[Your Name]

[Your Address]
[Date]`,
    placeholders: [
      { key: 'Recipient Name', labelKey: 'ph_recipient_name' },
      { key: 'Recipient Address', labelKey: 'ph_recipient_address' },
      { key: 'State the purpose of the letter', labelKey: 'ph_purpose' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Address', labelKey: 'ph_your_address' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  {
    id: 'biz-02',
    name: 'Business Meeting Request',
    description: 'A professional and polite template for requesting a formal business meeting to discuss a specific topic.',
    category: 'business',
    templateString: `[Recipient Name]
[Recipient Address]

Dear [Recipient Name],

I am writing to request a brief meeting with you to discuss [Topic of Discussion]. I believe a conversation would be highly beneficial to [Explain benefit, e.g., "align on the project goals"].

I am available to meet on [Suggest a few dates and times, e.g., "next Tuesday at 10 AM or Wednesday afternoon"]. Please let me know what time works best for you. I am flexible and can adjust my schedule accordingly.

I anticipate that the meeting will take no longer than [Estimated Duration, e.g., 30 minutes].

Thank you for your time and consideration. I look forward to hearing from you soon.

Best regards,
[Your Name]

[Your Address]
[Date]`,
    placeholders: [
      { key: 'Recipient Name', labelKey: 'ph_recipient_name' },
      { key: 'Recipient Address', labelKey: 'ph_recipient_address' },
      { key: 'Topic of Discussion', labelKey: 'ph_topic' },
      { key: 'Explain benefit', labelKey: 'ph_benefit' },
      { key: 'Suggest a few dates and times', labelKey: 'ph_dates_times' },
      { key: 'Estimated Duration', labelKey: 'ph_duration' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Address', labelKey: 'ph_your_address' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  {
    id: 'biz-03',
    name: 'Overdue Invoice Reminder',
    description: 'A gentle but firm reminder letter for clients with overdue payments, maintaining a professional tone.',
    category: 'business',
    templateString: `[Client Name]
[Client Address]

Subject: Gentle Reminder: Invoice #[Invoice Number]

Dear [Client Name],

I hope this letter finds you well.

This is a friendly reminder regarding Invoice #[Invoice Number] for the amount of [Invoice Amount], which was due on [Due Date]. We have not yet received payment for this invoice.

We understand that you may have overlooked this. A copy of the invoice is attached for your reference.

Please let us know if you have any questions or if there is any issue with the payment. We would appreciate it if you could settle this invoice at your earliest convenience.

Thank you for your prompt attention to this matter.

Sincerely,
[Your Name]

[Your Company Address]
[Date]`,
    placeholders: [
      { key: 'Client Name', labelKey: 'ph_client_name' },
      { key: 'Client Address', labelKey: 'ph_client_address' },
      { key: 'Invoice Number', labelKey: 'ph_invoice_number' },
      { key: 'Invoice Amount', labelKey: 'ph_invoice_amount' },
      { key: 'Due Date', labelKey: 'ph_due_date' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Company Address', labelKey: 'ph_your_company_address' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  // --- Resignation ---
  { 
    id: 'res-01', 
    name: 'Standard Resignation Letter', 
    description: 'A formal and respectful letter to notify your employer of your resignation, ensuring a smooth transition.', 
    category: 'resignation', 
    templateString: `[Manager's Name]
[Recipient Address]

Dear [Manager's Name],

Please accept this letter as formal notification that I am resigning from my position as [Your Job Title]. My last day of employment will be [Your Last Day], two weeks from today's date.

Thank you so much for the opportunity to work in this position for the past [Duration of Employment]. I've greatly enjoyed and appreciated the opportunities I've had, and I am grateful for the support provided to me during my time here.

I will do everything possible to wrap up my duties and train other team members during my final two weeks. Please let me know how I can be of assistance during this transition.

I wish you and the company all the best for the future.

Sincerely,
[Your Name]

[Your Address]
[Date]`,
    placeholders: [
      { key: "Manager's Name", labelKey: 'ph_manager_name' },
      { key: 'Recipient Address', labelKey: 'ph_recipient_address' },
      { key: 'Your Job Title', labelKey: 'ph_your_job_title' },
      { key: 'Your Last Day', labelKey: 'ph_your_last_day' },
      { key: 'Duration of Employment', labelKey: 'ph_employment_duration' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Address', labelKey: 'ph_your_address' },
      { key: 'Date', labelKey: 'ph_date' },
    ]
  },
  // --- Informal ---
  { 
    id: 'inf-01', 
    name: 'Personal Letter to Family', 
    description: 'A warm and personal template for sharing news and catching up with family members.', 
    category: 'informal', 
    templateString: `Dearest [Family Member's Name],

I hope this letter finds you well. I'm writing to you today to share some exciting news about [Topic of News].

[Elaborate on the news or update in the first paragraph. Share your feelings and the key details.]

[Use the second paragraph to share more about what's been happening in your life recently. You could talk about work, hobbies, or recent events.]

I was thinking about you the other day and remembered [Share a fond memory]. It always makes me smile. How have things been on your end? I would love to hear all about [Ask about something specific in their life].

I'm looking forward to [Mention a future plan, e.g., "our visit next month" or "our weekly call"].

Sending all my love,
[Your Name]

[Date]`,
    placeholders: [
      { key: "Family Member's Name", labelKey: 'ph_family_member_name' },
      { key: 'Topic of News', labelKey: 'ph_topic_of_news' },
      { key: 'Share a fond memory', labelKey: 'ph_fond_memory' },
      { key: 'Ask about something specific in their life', labelKey: 'ph_ask_about_life' },
      { key: 'Mention a future plan', labelKey: 'ph_future_plan' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Date', labelKey: 'ph_date' },
    ]
  },
  {
    id: 'inf-02',
    name: 'Friendly Letter to a Friend',
    description: 'A casual and heartfelt template for catching up with a friend, sharing news, and making plans.',
    category: 'informal',
    templateString: `My Dearest [Friend's Name],

How have you been? It feels like ages since we last properly caught up, and I was just thinking about you.

So much has happened lately! The biggest news is that [Share your main news or story]. I couldn't wait to tell you all about it.

I also remember our last conversation about [Mention a shared memory or inside joke]. That still makes me laugh. How did that situation with [Ask about something in their life] turn out? I'm dying to know!

We absolutely must [Suggest a plan, e.g., "grab coffee next week" or "plan a video call"]. Let me know when you're free.

Can't wait to hear from you!

Best,
[Your Name]

[Date]`,
    placeholders: [
      { key: "Friend's Name", labelKey: 'ph_friend_name' },
      { key: 'Share your main news or story', labelKey: 'ph_main_news' },
      { key: 'Mention a shared memory or inside joke', labelKey: 'ph_shared_memory' },
      { key: 'Ask about something in their life', labelKey: 'ph_ask_about_life' },
      { key: 'Suggest a plan', labelKey: 'ph_suggest_plan' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  {
    id: 'inf-03',
    name: 'Letter of Condolence',
    description: 'A thoughtful and empathetic template to express sympathy and support to someone going through a difficult time.',
    category: 'informal',
    templateString: `Dear [Recipient's Name],

I was so deeply saddened to hear about the passing of [Deceased's Name]. I cannot imagine the pain you must be feeling right now.

[Deceased's Name] was such a wonderful person who [Share a positive quality or memory, e.g., "always lit up the room with their smile" or "was so incredibly kind to everyone"]. I will always remember the time when [Share a brief, specific memory if you have one].

Please accept my heartfelt condolences during this incredibly difficult time. Know that I am thinking of you and your family. If there is anything at all I can do, whether it's running errands, bringing over a meal, or just being there to listen, please do not hesitate to reach out.

With deepest sympathy,
[Your Name]

[Date]`,
    placeholders: [
      { key: "Recipient's Name", labelKey: 'ph_recipient_name_condolence' },
      { key: "Deceased's Name", labelKey: 'ph_deceased_name' },
      { key: 'Share a positive quality or memory', labelKey: 'ph_positive_quality' },
      { key: 'Share a brief, specific memory if you have one', labelKey: 'ph_specific_memory' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  // --- Government ---
  { 
    id: 'gov-01', 
    name: 'Police Complaint (F.I.R.)', 
    description: 'A formal template for filing a First Information Report (F.I.R.) at a police station in India for incidents like theft or loss of documents.', 
    category: 'government', 
    templateString: `To,
The Officer in Charge,
[Police Station Name],
[Police Station Address]

Subject: Filing of First Information Report (F.I.R) regarding [Nature of Incident, e.g., theft of mobile phone, loss of documents].

Respected Sir/Madam,

I, [Your Full Name], son/daughter/wife of [Father's/Husband's Name], residing at [Your Full Address], would like to report the following incident.

On [Date of Incident] at approximately [Time of Incident], the following incident occurred at [Location of Incident]:
[Provide a detailed, chronological account of the incident. Be factual and precise. Include details of what was lost/stolen, any witnesses, and any identifying features of suspects if applicable.]

The item(s) lost/stolen are as follows:
1. [Item 1 with description, serial number, etc.]
2. [Item 2 with description, serial number, etc.]

I have not filed a complaint regarding this incident at any other police station.

I, therefore, request you to kindly register my complaint as a First Information Report (F.I.R) and provide me with a copy of the same. Please take the necessary legal action to investigate this matter.

Thank you for your assistance.

Yours sincerely,
[Your Full Name]

Contact Number: [Your Phone Number]
Email: [Your Email Address]
Date: [Date]`,
    placeholders: [
      { key: 'Police Station Name', labelKey: 'ph_police_station_name' },
      { key: 'Police Station Address', labelKey: 'ph_police_station_address' },
      { key: 'Nature of Incident', labelKey: 'ph_nature_of_incident' },
      { key: 'Your Full Name', labelKey: 'ph_your_full_name' },
      { key: "Father's/Husband's Name", labelKey: 'ph_father_husband_name' },
      { key: 'Your Full Address', labelKey: 'ph_your_full_address' },
      { key: 'Date of Incident', labelKey: 'ph_date_of_incident' },
      { key: 'Time of Incident', labelKey: 'ph_time_of_incident' },
      { key: 'Location of Incident', labelKey: 'ph_location_of_incident' },
      { key: 'Provide a detailed, chronological account of the incident', labelKey: 'ph_incident_details' },
      { key: 'Item 1 with description, serial number, etc.', labelKey: 'ph_item_1' },
      { key: 'Item 2 with description, serial number, etc.', labelKey: 'ph_item_2' },
      { key: 'Your Phone Number', labelKey: 'ph_your_phone' },
      { key: 'Your Email Address', labelKey: 'ph_your_email' },
      { key: 'Date', labelKey: 'ph_date' },
    ]
  },
  {
    id: 'gov-02',
    name: 'Right to Information (RTI) Application',
    description: 'A standardized format for Indian citizens to request information from government bodies under the RTI Act, 2005.',
    category: 'government',
    templateString: `To,
The Public Information Officer (PIO),
[Name of the Public Authority/Department],
[Address of the Public Authority]

Subject: Application under the Right to Information Act, 2005.

Dear Sir/Madam,

I, [Your Full Name], son/daughter/wife of [Father's/Husband's Name], residing at [Your Full Address], am an Indian citizen. I am seeking information under the RTI Act, 2005.

Please provide me with the following information:
1. [Specific Question 1]
2. [Specific Question 2]
3. [Specific Question 3]

I am enclosing an IPO/DD/Cash of Rs. 10/- (Rupees Ten only) as the application fee.
[If you are from a BPL family, mention it here and attach a copy of the BPL card instead of the fee.]

Please provide the information in [Preferred format, e.g., "hard copy" or "soft copy via email"]. My email address is [Your Email Address].

Thank you.

Yours faithfully,
[Your Full Name]

Contact Number: [Your Phone Number]
Date: [Date]`,
    placeholders: [
      { key: 'Name of the Public Authority/Department', labelKey: 'ph_public_authority' },
      { key: 'Address of the Public Authority', labelKey: 'ph_authority_address' },
      { key: 'Your Full Name', labelKey: 'ph_your_full_name' },
      { key: "Father's/Husband's Name", labelKey: 'ph_father_husband_name' },
      { key: 'Your Full Address', labelKey: 'ph_your_full_address' },
      { key: 'Specific Question 1', labelKey: 'ph_question_1' },
      { key: 'Specific Question 2', labelKey: 'ph_question_2' },
      { key: 'Specific Question 3', labelKey: 'ph_question_3' },
      { key: 'Preferred format', labelKey: 'ph_preferred_format' },
      { key: 'Your Email Address', labelKey: 'ph_your_email' },
      { key: 'Your Phone Number', labelKey: 'ph_your_phone' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  // --- Education ---
  { 
    id: 'edu-01',
    name: 'School Leave Application', 
    description: 'A simple and formal application for students to request a leave of absence from school.', 
    category: 'education', 
    templateString: `To,
The Principal,
[School Name],
[School Address]

Subject: Application for leave of absence.

Respected Sir/Madam,

I, [Your Name], a student of Class [Your Class and Section], would like to request a leave of absence for [Number of Days] day(s), from [Start Date] to [End Date].

The reason for my absence is [Reason for leave, e.g., a family function, a doctor's appointment, not feeling well].

I will ensure that I complete all my pending classwork and homework during my absence. I kindly request you to grant me leave for the aforementioned dates.

Thank you for your understanding.

Yours obediently,
[Your Name]

Roll No: [Your Roll Number]
Parent's Contact: [Parent's Phone Number]
Date: [Date]`,
    placeholders: [
      { key: 'School Name', labelKey: 'ph_school_name' },
      { key: 'School Address', labelKey: 'ph_school_address' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Class and Section', labelKey: 'ph_class_section' },
      { key: 'Number of Days', labelKey: 'ph_number_of_days' },
      { key: 'Start Date', labelKey: 'ph_start_date' },
      { key: 'End Date', labelKey: 'ph_end_date' },
      { key: 'Reason for leave', labelKey: 'ph_reason_for_leave' },
      { key: 'Your Roll Number', labelKey: 'ph_roll_number' },
      { key: "Parent's Phone Number", labelKey: 'ph_parent_phone' },
      { key: 'Date', labelKey: 'ph_date' },
    ]
  },
  {
    id: 'edu-02',
    name: 'Bonafide Certificate Request',
    description: 'A formal letter to request a Bonafide Certificate from a school or college for official purposes.',
    category: 'education',
    templateString: `To,
The Principal / Head of Department,
[Institution Name],
[Institution Address]

Subject: Request for a Bonafide Certificate.

Respected Sir/Madam,

I am [Your Name], a student of [Your Course/Class] with Roll/ID Number [Your ID Number]. I am writing to request a Bonafide Certificate for the purpose of [State the purpose, e.g., "applying for a passport," "opening a bank account," or "availing a student discount"].

I require this certificate to verify that I am a current student at this institution.

I have attached a copy of my student ID card for your reference. I would be grateful if you could issue the certificate at your earliest convenience.

Thank you for your consideration.

Yours obediently,
[Your Name]

[Your Course/Class]
Roll/ID No: [Your ID Number]
Date: [Date]`,
    placeholders: [
      { key: 'Institution Name', labelKey: 'ph_institution_name' },
      { key: 'Institution Address', labelKey: 'ph_institution_address' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Course/Class', labelKey: 'ph_course_class' },
      { key: 'Your ID Number', labelKey: 'ph_id_number' },
      { key: 'State the purpose', labelKey: 'ph_purpose_bonafide' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  {
    id: 'edu-03',
    name: 'Fee Concession Application',
    description: 'A formal application for students to request a fee concession from their educational institution due to financial hardship.',
    category: 'education',
    templateString: `To,
The Principal,
[School/College Name],
[School/College Address]

Subject: Application for Fee Concession.

Respected Sir/Madam,

I am [Your Name], a student of [Your Class/Course]. My father/guardian, [Father's/Guardian's Name], works as a [Father's/Guardian's Occupation] and our family's financial condition is not stable at the moment due to [State the reason for financial hardship].

I am a diligent student and have always secured good marks in my examinations. I am very keen to continue my studies at this esteemed institution.

Therefore, I kindly request you to grant me a full/partial fee concession for this academic year. I have attached the necessary documents (e.g., income certificate) for your consideration.

I will be very grateful for your kindness.

Thank you.

Yours obediently,
[Your Name]

Class/Course: [Your Class/Course]
Roll No: [Your Roll Number]
Date: [Date]`,
    placeholders: [
      { key: 'School/College Name', labelKey: 'ph_school_college_name' },
      { key: 'School/College Address', labelKey: 'ph_school_college_address' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Class/Course', labelKey: 'ph_class_course' },
      { key: "Father's/Guardian's Name", labelKey: 'ph_guardian_name' },
      { key: "Father's/Guardian's Occupation", labelKey: 'ph_guardian_occupation' },
      { key: 'State the reason for financial hardship', labelKey: 'ph_financial_hardship' },
      { key: 'Your Roll Number', labelKey: 'ph_roll_number' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  // --- Complaint ---
  {
    id: 'comp-01',
    name: 'Product Complaint Letter',
    description: 'A formal letter to complain about a faulty or unsatisfactory product and request a resolution like a refund or replacement.',
    category: 'complaint',
    templateString: `Customer Service Department
[Recipient Address]

Subject: Complaint Regarding Faulty [Product Name] (Order #[Order Number])

To Whom It May Concern,

I am writing to file a formal complaint about a [Product Name] that I purchased from your [Store/Website] on [Date of Purchase]. The order number is #[Order Number].

Unfortunately, the product has not performed as expected. Specifically, [Describe the problem in detail, e.g., "the device does not turn on," or "it stopped working after two days"]. This is very disappointing as I have always trusted the quality of your products.

To resolve this issue, I would appreciate a [State desired resolution, e.g., "full refund" or "replacement product"]. I have attached a copy of my receipt and a photo of the faulty product.

I look forward to your prompt reply and a resolution to this problem. I can be reached at [Your Phone Number] or [Your Email].

Sincerely,
[Your Name]

[Your Address]
[Date]`,
    placeholders: [
      { key: 'Recipient Address', labelKey: 'ph_recipient_address' },
      { key: 'Product Name', labelKey: 'ph_product_name' },
      { key: 'Order Number', labelKey: 'ph_order_number' },
      { key: 'Store/Website', labelKey: 'ph_store_website' },
      { key: 'Date of Purchase', labelKey: 'ph_purchase_date' },
      { key: 'Describe the problem in detail', labelKey: 'ph_problem_details' },
      { key: 'State desired resolution', labelKey: 'ph_desired_resolution' },
      { key: 'Your Phone Number', labelKey: 'ph_your_phone' },
      { key: 'Your Email', labelKey: 'ph_your_email' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Address', labelKey: 'ph_your_address' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
  // --- Thank You ---
  {
    id: 'ty-01',
    name: 'Post-Interview Thank You Letter',
    description: 'A polite and professional letter to thank an interviewer for their time and reiterate your interest in the position.',
    category: 'thank-you',
    templateString: `Dear [Interviewer's Name],

Thank you so much for taking the time to speak with me today about the [Job Title] position. I truly enjoyed our conversation and learning more about this opportunity.

I was particularly interested to hear about [Mention a specific topic from the interview]. Our discussion has further solidified my interest in this role and my belief that my skills in [Your Key Skill] would be a great asset to your team.

I am very enthusiastic about the possibility of joining your company and contributing to your success.

Thank you again for your time and consideration. I look forward to hearing from you soon.

Best regards,
[Your Name]

[Your Phone Number]
[Your Email]
[Date]`,
    placeholders: [
      { key: "Interviewer's Name", labelKey: 'ph_interviewer_name' },
      { key: 'Job Title', labelKey: 'ph_job_title' },
      { key: 'Mention a specific topic from the interview', labelKey: 'ph_interview_topic' },
      { key: 'Your Key Skill', labelKey: 'ph_your_key_skill' },
      { key: 'Your Name', labelKey: 'ph_your_name' },
      { key: 'Your Phone Number', labelKey: 'ph_your_phone' },
      { key: 'Your Email', labelKey: 'ph_your_email' },
      { key: 'Date', labelKey: 'ph_date' },
    ],
  },
];
