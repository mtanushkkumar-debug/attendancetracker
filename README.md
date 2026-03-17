SYSTEM DESCRIPTION (Attendance Tracker)
 System Name:

Attendance Tracking System (Single Teacher, Single Class)

 1. Objective

The system is designed to:

Manage student records

Track daily attendance

Automate attendance session handling

Provide analytical insights on attendance performance

 2. System Architecture
[ React Frontend ]
        ↓
[ Spring Boot Backend ]
        ↓
[ Service Layer (Logic) ]
        ↓
[ MySQL Database ]
 3. Core Modules
 1. Student Management Module

Add, update, delete students

View student list

2. Attendance Management Module

Mark attendance (Present/Absent)

Bulk update attendance

Date/session-based tracking

 3. Session Management Module

Start attendance session

Auto-close session after time

Prevent editing after closure

 4. Analytics Module

Calculate attendance percentage

Identify low attendance students

Generate summary reports

 5. Settings Module

Configure attendance threshold

Set auto-close time

 4. Entities in the System
Student

Stores student details

 Attendance

Stores daily attendance records

 Session

Represents a day’s attendance window

 AttendanceSummary

Stores calculated attendance stats

 Settings

Stores system configuration

 5. System Workflow
 Step 1: Add Students

Teacher adds students via UI

 Step 2: Start Session

Teacher starts attendance session

Session status → OPEN

 Step 3: Mark Attendance

Teacher marks attendance

Data saved in database

 Step 4: Auto Close Session

System automatically closes session after set time

 Step 5: Generate Summary

AttendanceSummary updated

Percentage calculated

 Step 6: View Analytics

Dashboard shows:

Attendance %

Low attendance alerts

 6. Functional Requirements

Add/Edit/Delete students

Mark attendance daily

View attendance by date

Auto-close attendance session

Generate attendance reports

Highlight students below threshold

 7. Business Rules

One attendance record per student per day

Attendance cannot be modified after session closes

Attendance percentage is auto-calculated

Threshold defines minimum attendance requirement

 8. Key Algorithms
 Attendance Calculation
attendance % = (present_days / total_days) × 100
 Auto Close Logic
If current_time > auto_close_time
   → session = CLOSED
 9. Data Storage

MySQL database

Tables:

student

attendance

session

attendance_summary

settings


