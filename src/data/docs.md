# AcmePay

AcmePay is an online payment platform.

## Login

Users can log in using their email and password.

A successful login redirects the user to the dashboard.

After 5 failed login attempts, the account is temporarily locked.

## Password Reset

Users can reset their password using their registered email.

The password reset link expires after 30 minutes.

## Payments

Payments support credit cards, debit cards and UPI.

A successful payment generates a payment ID.

Failed payments should not generate a successful transaction.

## Refunds

Users can request a refund within 7 days of a successful payment.

Refund processing can take 5-7 business days.
