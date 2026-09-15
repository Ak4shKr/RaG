# AcmePay Internal and Customer Policy Manual

AcmePay is an online payment platform used by merchants, customers, support agents, finance teams, and internal employees. The company maintains multiple policies that sometimes use similar language but apply to different audiences. When a question mentions "policy", "approval", "security", "refund", "access", "remote work", or "exception" without enough detail, the assistant should identify the possible policies and ask the user which one they mean.

This document intentionally contains overlapping topics. For example, the word "approval" appears in refund approvals, expense approvals, remote work approvals, production access approvals, and vendor approvals. The word "security" appears in customer account security, employee device security, merchant risk security, and data retention controls.

---

## 1. Customer Account Access Policy

The Customer Account Access Policy explains how customers log in, recover accounts, and protect their payment profile. Customers can log in using their registered email address and password. A successful login redirects the customer to the dashboard, where they can view payment history, saved payment methods, refunds, and merchant subscriptions.

After 5 failed login attempts, the account is temporarily locked. The lock lasts for 30 minutes unless the customer verifies identity through password reset. A password reset link can be sent to the registered email address, and the link expires after 30 minutes. Customers should not share reset links with anyone, including support agents.

Advantages of this policy:

- It protects customers from brute-force login attacks.
- It gives customers a self-service recovery path.
- It reduces dependency on support agents for routine login issues.
- It limits the damage if someone guesses a password incorrectly multiple times.

Disadvantages of this policy:

- A genuine customer may be locked out after repeated typing mistakes.
- Customers who lose access to their registered email may need manual support verification.
- Attackers can intentionally trigger lockouts if they know a customer's email address.
- Support teams may receive more tickets from customers who do not understand temporary lockouts.

Security notes:

- Support agents can confirm whether an account is locked, but they cannot see or reveal passwords.
- A support agent may trigger a password reset email only after confirming basic customer identity.
- For high-risk accounts, support must escalate to the Trust and Safety team before unlocking.
- Login security is customer-facing and should not be confused with employee access security.

Clarification example: If a user asks "What happens after failed attempts?", the assistant should clarify whether they mean customer login attempts, merchant API authentication attempts, or employee admin console attempts.

---

## 2. Customer Refund and Failed Payment Policy

The Customer Refund and Failed Payment Policy explains how AcmePay handles refunds, failed transactions, and cases where money is deducted but payment confirmation is not generated. Payments support credit cards, debit cards, net banking, wallets, and UPI. A successful payment generates a payment ID. Failed payments must not generate a successful transaction record.

Customers can request a refund within 7 days of a successful payment. Refund processing can take 5-7 business days depending on the payment rail, issuing bank, merchant settlement status, and risk review. If money is deducted but no successful payment ID is generated, the customer can contact support and request a payment trace.

Advantages of this policy:

- It gives customers a clear refund window.
- It protects merchants from indefinite refund claims.
- It separates successful refunds from failed-payment reversals.
- It creates a predictable support workflow.

Disadvantages of this policy:

- Customers may expect instant refunds even when banks take several days.
- Merchants may dispute refund requests close to the 7-day boundary.
- Failed-payment reversals can be confused with merchant-initiated refunds.
- Support agents may need to explain multiple timelines for card, UPI, and wallet transactions.

Refund approval rules:

- Refunds below ₹1,000 can be handled by standard support if the merchant refund rules allow it.
- Refunds between ₹1,000 and ₹25,000 require senior support approval.
- Refunds above ₹25,000 require finance review and risk approval.
- Refunds related to suspected fraud require Trust and Safety approval regardless of amount.

Failed payment rules:

- If a payment failed and no payment ID exists, the case is treated as a reversal trace, not a refund.
- If a payment succeeded and the customer wants money back, the case is treated as a refund.
- If the merchant received settlement but the customer claims non-delivery, support must check merchant evidence.
- If a UPI transaction is pending, support should wait for bank confirmation before promising a refund.

Clarification example: If a user asks "How long does refund take?", the assistant may answer 5-7 business days if the question clearly refers to a customer refund. If the user asks "How long does reversal take?", the assistant should clarify whether it is a failed payment reversal, merchant refund, or bank dispute.

---

## 3. Merchant Settlement and Chargeback Policy

The Merchant Settlement and Chargeback Policy applies to businesses that receive payments through AcmePay. It should not be confused with the customer refund policy. Settlement means transferring collected funds from AcmePay to the merchant's bank account. A chargeback means the customer's bank disputes a card payment after settlement or authorization.

Standard settlement happens on T+2 business days, where T is the transaction date. High-risk merchants may be moved to T+5 or rolling reserve settlement. New merchants may have a temporary settlement hold during onboarding verification.

Advantages of this policy:

- It gives merchants predictable payout timelines.
- It protects AcmePay from fraud and chargeback losses.
- It allows risk-based settlement controls.
- It creates separation between refunds and settlements.

Disadvantages of this policy:

- New merchants may feel that holds slow down cash flow.
- High-risk merchants may complain that rolling reserves are restrictive.
- Chargebacks can occur after settlement, causing confusion.
- Support teams must explain that customer refunds and merchant settlements are separate processes.

Chargeback rules:

- Merchants must respond to chargeback evidence requests within 3 business days.
- Evidence can include invoice, delivery proof, customer communication, service logs, or refund history.
- If the merchant does not respond on time, AcmePay may accept the chargeback.
- Repeated chargebacks can trigger merchant review or temporary payout hold.

Settlement exception rules:

- Finance can approve early settlement for verified enterprise merchants.
- Risk can block settlement for suspicious transaction patterns.
- Support cannot manually release settlements without finance or risk approval.
- Settlement exceptions must be logged with reason, approver, and time period.

Clarification example: If a user asks "When will the money come back?", this could mean customer refund, failed payment reversal, merchant settlement, or chargeback recovery. The assistant should ask which money flow the user means.

---

## 4. Employee Remote Work and Hybrid Attendance Policy

The Employee Remote Work and Hybrid Attendance Policy applies to AcmePay employees and contractors. It does not apply to customers or merchants. Employees may work remotely up to 2 days per week with manager approval. Product, engineering, design, finance, and operations teams can request flexible remote schedules if business needs allow.

Hybrid employees are expected to work from office at least 3 days per week. Fully remote arrangements require director-level approval and must be reviewed every quarter. Contractors may follow separate agreements based on project terms.

Advantages of this policy:

- It improves employee flexibility.
- It helps teams hire talent across locations.
- It reduces commute fatigue.
- It supports focused work for engineering, writing, research, and analysis tasks.

Disadvantages of this policy:

- Collaboration can become slower if team schedules do not overlap.
- New employees may find onboarding harder without office interaction.
- Sensitive projects may require office-only work.
- Managers may apply remote approval rules inconsistently.

Approval rules:

- Up to 2 remote days per week require manager approval.
- More than 2 remote days require department head approval.
- Fully remote status requires director approval.
- Emergency remote work due to illness, travel disruption, or family need can be approved temporarily.

Security overlap:

- Remote work approval does not automatically grant production access.
- Remote employees must still follow device security rules.
- Work-from-home networks should use secure Wi-Fi and company VPN where required.
- Employees handling regulated financial data may have stricter requirements.

Clarification example: If a user asks "What is the approval policy?", the assistant should ask whether they mean remote work approval, expense approval, refund approval, production access approval, or vendor approval.

---

## 5. Employee Device and Data Security Policy

The Employee Device and Data Security Policy explains how employees protect company systems, customer information, merchant records, and internal documents. Every employee must use a company-approved device or a device enrolled in mobile/device management. Disk encryption, screen lock, antivirus protection, and operating system updates are required.

Employees must use multi-factor authentication for email, source code systems, admin consoles, analytics dashboards, and finance tools. Passwords must not be reused across personal and company accounts. Shared credentials are prohibited except for approved break-glass accounts managed by the security team.

Advantages of this policy:

- It reduces risk of account takeover.
- It protects customer and merchant data.
- It gives security teams visibility into device posture.
- It supports compliance audits.

Disadvantages of this policy:

- Device enrollment may feel intrusive to employees.
- Strict update rules can interrupt work.
- Contractors may need extra setup time before accessing systems.
- MFA fatigue can occur if employees receive too many login prompts.

Data handling rules:

- Customer payment data must not be downloaded to personal devices.
- Production database exports require security approval.
- Logs containing personal data must be redacted before sharing broadly.
- Screenshots of dashboards should not reveal customer emails, phone numbers, or payment identifiers.

Access overlap:

- Device compliance is required before access is granted.
- Production access has a separate approval policy.
- Remote work approval does not override device security requirements.
- Customer support access to user accounts is monitored separately.

Clarification example: If a user asks "What is the security policy?", the assistant should ask whether they mean customer login security, employee device security, production access security, merchant risk security, or data retention security.

---

## 6. Production Access and Admin Console Policy

The Production Access and Admin Console Policy controls employee access to live customer and merchant systems. Production access is granted only when required for job duties. Access should be temporary when possible and must be reviewed regularly.

Engineering, support, finance, and trust teams may need different levels of production access. Read-only access is preferred over write access. Write access requires stronger justification, manager approval, and security approval. Sensitive actions such as manual refunds, account unlocks, settlement releases, and merchant risk overrides require audit logging.

Advantages of this policy:

- It limits accidental or unauthorized changes.
- It creates an audit trail for sensitive operations.
- It supports least-privilege access.
- It separates customer support powers from engineering powers.

Disadvantages of this policy:

- Approval steps can slow down urgent investigations.
- Employees may need temporary access repeatedly.
- Strict rules can create operational friction during incidents.
- Poorly defined roles can cause confusion about who approves what.

Access approval rules:

- Read-only production access requires manager approval.
- Write access requires manager and security approval.
- Emergency access can be granted during incidents but must be reviewed afterward.
- Access must be removed when an employee changes role or leaves the company.

Human-in-the-loop requirement:

- If a request involves manual account unlock, manual refund, settlement release, or risk override, an authorized human reviewer must approve it.
- AI assistants may summarize context and suggest next steps, but they must not execute sensitive production actions independently.
- The final decision must remain with a qualified employee for high-risk actions.

Clarification example: If a user asks "Can AI approve this?", the assistant should ask what action is being approved: refund, production access, remote work, vendor onboarding, settlement release, or account unlock.

---

## 7. Expense Reimbursement and Travel Policy

The Expense Reimbursement and Travel Policy applies to employees who spend money for business purposes. It should not be confused with customer refunds. Reimbursement means the company pays an employee back for approved business expenses.

Employees must submit reimbursement claims within 30 days of the expense date. Receipts are required for expenses above ₹500. Manager approval is required for standard reimbursements. Finance approval is required for travel, lodging, conference fees, hardware purchases, and expenses above ₹10,000.

Advantages of this policy:

- It gives employees a clear way to recover business expenses.
- It helps finance track company spending.
- It reduces misuse of company funds.
- It creates evidence for tax and audit purposes.

Disadvantages of this policy:

- Employees may forget to submit claims within 30 days.
- Receipt requirements can be inconvenient.
- Approval delays can frustrate employees.
- Travel exceptions can be unclear if plans change suddenly.

Approval overlap:

- Expense approval is different from refund approval.
- Travel approval is different from remote work approval.
- Hardware purchase approval may also require IT/security review.
- Client entertainment expenses may require department head approval.

Clarification example: If a user asks "Can I get my money back?", the assistant should ask whether they are a customer asking for refund, an employee asking for reimbursement, or a merchant asking about settlement.

---

## 8. Vendor Onboarding and Third-Party Risk Policy

The Vendor Onboarding and Third-Party Risk Policy applies when AcmePay works with external vendors, SaaS tools, consultants, auditors, or contractors. Before a vendor can access company data or systems, the business owner must submit a vendor request.

Low-risk vendors that do not access customer data may be approved by procurement. Vendors that access customer data, production systems, financial records, or source code require security review, legal review, and business owner approval. Critical vendors must be reviewed annually.

Advantages of this policy:

- It reduces third-party security risk.
- It ensures contracts include privacy and security terms.
- It prevents teams from buying unapproved tools with sensitive data access.
- It improves compliance readiness.

Disadvantages of this policy:

- Vendor onboarding can take time.
- Teams may find the review process heavy for small tools.
- Security questionnaires can delay urgent procurement.
- Vendors may not always provide complete documentation quickly.

Vendor approval rules:

- Procurement approval is required for purchase and contract terms.
- Security approval is required for data or system access.
- Legal approval is required for privacy, liability, and compliance clauses.
- Finance approval is required for budget impact.

Overlap with other policies:

- Contractor device security may apply if vendor employees access internal systems.
- Data retention rules apply to vendor-stored customer data.
- Production access rules apply if a vendor needs live system access.
- Incident response rules apply if a vendor reports or causes a data incident.

Clarification example: If a user asks "What is third-party approval?", the assistant should ask whether they mean vendor onboarding, contractor access, procurement budget approval, or third-party data retention.

---

## 9. Data Retention and Deletion Policy

The Data Retention and Deletion Policy defines how long AcmePay keeps customer, merchant, employee, support, audit, and transaction data. Different types of data have different retention periods because of legal, operational, tax, and security requirements.

Transaction records are retained for 7 years for compliance and audit purposes. Customer support conversations are retained for 2 years unless linked to fraud, legal dispute, or compliance investigation. Login and security logs are retained for 1 year. Employee reimbursement records are retained for 7 years. Vendor risk records are retained for the life of the vendor relationship plus 3 years.

Advantages of this policy:

- It supports audits and legal requirements.
- It helps investigate fraud and disputes.
- It prevents indefinite storage of unnecessary data.
- It gives teams clear deletion rules.

Disadvantages of this policy:

- Users may expect immediate deletion of all data.
- Legal retention requirements can conflict with deletion requests.
- Multiple systems may store copies of related data.
- Teams must understand which retention rule applies.

Deletion rules:

- Customers may request deletion of profile data where legally allowed.
- Transaction records may be retained even after profile deletion if required by law.
- Support tickets linked to fraud or disputes may be retained longer.
- Backup deletion may follow a delayed deletion cycle.

Clarification example: If a user asks "How long do you keep data?", the assistant should ask what data type they mean: transaction records, support tickets, login logs, employee records, vendor records, or deleted-account data.

---

## 10. Human-in-the-Loop AI Assistant Policy

The Human-in-the-Loop AI Assistant Policy defines how AcmePay uses AI assistants for customer support, internal knowledge retrieval, risk summaries, and workflow recommendations. AI assistants may retrieve relevant policy information, summarize documents, draft responses, and ask clarification questions.

AI assistants must ask for clarification when the user's request is ambiguous, when multiple policies match the question, or when the requested action could affect money, access, security, compliance, or customer trust. AI assistants should not pretend to know which policy applies when the user's wording is unclear.

Examples of ambiguous questions:

- "What is the approval policy?" could refer to refund approval, expense approval, remote work approval, production access approval, vendor approval, or settlement exception approval.
- "How do I get my money back?" could refer to customer refund, failed payment reversal, employee reimbursement, chargeback recovery, or merchant settlement.
- "What is the security policy?" could refer to customer login security, employee device security, production access security, data retention, or vendor security review.
- "Can this be handled automatically?" could refer to AI support replies, manual refund approval, account unlock, merchant risk override, or production incident handling.

Advantages of this policy:

- It reduces hallucinated answers.
- It keeps users involved when intent is unclear.
- It improves safety for money movement and access decisions.
- It makes the assistant more trustworthy.

Disadvantages of this policy:

- Users may need to answer follow-up questions.
- The assistant may feel slower for broad questions.
- Over-clarification can frustrate users if the answer was obvious.
- The assistant must balance helpfulness with caution.

Human approval requirements:

- AI must not approve refunds above policy thresholds.
- AI must not unlock high-risk customer accounts by itself.
- AI must not grant production access.
- AI must not approve vendor onboarding for sensitive data access.
- AI must not release merchant settlements or override risk holds.

Preferred clarification style:

- Ask one short clarification question.
- Mention the likely interpretations.
- Do not list every policy unless necessary.
- After the user clarifies, answer using the relevant retrieved context.

Example response for ambiguity:

"Do you mean the customer refund policy, employee reimbursement policy, or merchant settlement policy? The answer depends on which money flow you are asking about."

---

## 11. Policy Conflict and Exception Handling

Sometimes two AcmePay policies appear to conflict. For example, a customer may request deletion of account data while transaction data must be retained for compliance. An employee may request remote work while a sensitive production incident requires office-only work. A merchant may request early settlement while risk rules require a hold.

When policies conflict, the stricter security, legal, compliance, or risk requirement usually takes priority. Exceptions must be documented with reason, approver, scope, and expiry date. Temporary exceptions are preferred over permanent exceptions.

Advantages of exception handling:

- It allows business flexibility.
- It prevents rigid rules from blocking urgent work.
- It creates accountability for unusual decisions.
- It records why a policy was overridden.

Disadvantages of exception handling:

- Too many exceptions weaken policy consistency.
- Approvers may make inconsistent decisions.
- Poorly documented exceptions create audit risk.
- Users may expect exceptions as a default path.

Exception examples:

- A high-value merchant may receive early settlement after finance and risk approval.
- An employee may receive temporary remote work approval after relocation or medical need.
- A production engineer may receive emergency write access during an incident.
- A customer account may be unlocked after enhanced identity verification.

Clarification example: If a user asks "Can we make an exception?", the assistant should ask which policy and what exception they are requesting before answering.
