# Bug Report

## Bug 1

Issue: Mars Rover API initially returned 404.

Cause:
Incorrect API endpoint/date formatting.

Resolution:
Validated rover names and date ranges.

Status:
Resolved

---

## Bug 2

Issue: MongoDB connection buffering timeout.

Cause:
Database connection established using MongoClient while models used Mongoose.

Resolution:
Database configuration corrected.

Status:
Resolved
