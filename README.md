# Campus Notification System

This project was developed for the Campus Hiring Evaluation.

## Features

* Fetch notifications from API
* Filter by notification type
* Pagination support
* Viewed / Unviewed notifications
* Priority Notifications page
* Responsive UI using Material UI

## Tech Stack

* Next.js
* TypeScript
* Material UI
* Node.js

## Run Locally

```bash
cd notification_app_fe
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Priority Logic

Priority is calculated using notification type and recency.

Weights used:

* Placement = 100
* Result = 60
* Event = 30

Recent notifications recieve higher priority score.

## Author

Adarsh Dubey
Roll No: 2302901540009









## Process Flow

1. Authenticate and get access token.
2. Fetch notifications.
3. Calculate priority for each notification.
4. Sort notifications by priority.
5. Display top 10 notifications.

## Logging
Logging middleware is integrated to track:

* Authentication
* Notification fetching
* Priority calculation
* Errors
## Scalability

For larger datasets, a Min Heap of size 10 can be used instead of sorting all notifications repeatedly.











## Conclusion

The system successfully ranks notifications based on importance and recency while maintaining simple and scalable logic.
