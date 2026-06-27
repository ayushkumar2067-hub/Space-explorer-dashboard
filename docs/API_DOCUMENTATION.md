# Space Explorer Dashboard API Documentation

## Base URL

```http
http://localhost:5000/api
```

---

# 1. Astronomy Picture of the Day (APOD)

## Get APOD

### Endpoint

```http
GET /apod
```

### Description

Retrieves NASA Astronomy Picture of the Day.

### Request

```http
GET http://localhost:5000/api/apod
```

### Success Response

```json
{
  "title": "Milky Way Urban Style",
  "date": "2026-06-26",
  "url": "image_url",
  "explanation": "NASA astronomy picture description"
}
```

### Status Codes

| Code | Description  |
| ---- | ------------ |
| 200  | Success      |
| 500  | Server Error |

---

# 2. Mars Rover Photos

## Get Rover Photos

### Endpoint

```http
GET /mars
```

### Description

Returns images captured by NASA Mars Rovers.

### Request

```http
GET /api/mars?rover=curiosity&earth_date=2020-07-01
```

### Query Parameters

| Parameter  | Type   | Required |
| ---------- | ------ | -------- |
| rover      | String | No       |
| earth_date | Date   | No       |
| sol        | Number | No       |
| camera     | String | No       |
| page       | Number | No       |

### Success Response

```json
{
  "success": true,
  "rover": "curiosity",
  "count": 25,
  "photos": [...]
}
```

### Status Codes

| Code | Description     |
| ---- | --------------- |
| 200  | Success         |
| 400  | Invalid Request |
| 500  | Server Error    |

---

# 3. Rover Information

## Get Rover Metadata

### Endpoint

```http
GET /mars/rovers
```

### Description

Returns rover names and operational date ranges.

### Request

```http
GET /api/mars/rovers
```

### Success Response

```json
{
  "success": true,
  "rovers": [...]
}
```

---

# 4. Favorites

## Create Favorite

### Endpoint

```http
POST /favorites
```

### Request Body

```json
{
  "title": "Milky Way Urban Style",
  "imageUrl": "image_url",
  "date": "2026-06-26"
}
```

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Get All Favorites

### Endpoint

```http
GET /favorites
```

### Success Response

```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

---

## Update Favorite

### Endpoint

```http
PUT /favorites/:id
```

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Delete Favorite

### Endpoint

```http
DELETE /favorites/:id
```

### Success Response

```json
{
  "success": true,
  "message": "Favorite deleted"
}
```

---

# Authentication

Currently authentication is not implemented.

Future versions may use JWT-based authentication.

---

# Error Response Format

```json
{
  "success": false,
  "message": "Error description"
}
```
