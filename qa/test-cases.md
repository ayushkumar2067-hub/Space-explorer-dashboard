# Space Explorer Dashboard - Test Cases

## Test Case 1: Home Page Loads

**Objective:** Verify application loads successfully.

**Steps:**

1. Start backend server.
2. Start frontend server.
3. Open browser.

**Expected Result:**
Dashboard loads successfully.

**Status:** PASS

---

## Test Case 2: APOD API Fetch

**Objective:** Verify NASA APOD data loads.

**Steps:**

1. Open dashboard.
2. Wait for APOD section.

**Expected Result:**
Image, title, and explanation are displayed.

**Status:** PASS

---

## Test Case 3: Mars Rover Search

**Objective:** Verify Mars Rover API integration.

**Steps:**

1. Select rover.
2. Select date.
3. Click Search Photos.

**Expected Result:**
Mars Rover images are displayed.

**Status:** PASS

---

## Test Case 4: Invalid Rover Input

**Objective:** Verify backend validation.

**Steps:**

1. Send invalid rover name.

**Expected Result:**
400 Bad Request returned.

**Status:** PASS

---

## Test Case 5: MongoDB Connection

**Objective:** Verify database connectivity.

**Steps:**

1. Start backend.

**Expected Result:**
MongoDB connection established.

**Status:** PASS

---

## Test Case 6: Save Favorite

**Objective:** Verify favorite creation.

**Steps:**

1. Click Save Favorite.

**Expected Result:**
Data stored in MongoDB.

**Status:** PASS

---

## Test Case 7: Get Favorites

**Objective:** Verify favorite retrieval.

**Steps:**

1. Open Favorites section.

**Expected Result:**
Saved items are displayed.

**Status:** PASS

---

## Test Case 8: API Error Handling

**Objective:** Verify error handling.

**Steps:**

1. Disconnect internet.
2. Fetch APOD.

**Expected Result:**
Error message displayed.

**Status:** PASS
