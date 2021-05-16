# Cowin Notify Server

## About

A backend server written using nodejs, express and typescript which checks cowin slot availability and notifies on flock when a slot becomes available. Currently only checks for Washim District, Maharashtra, but can be easily extended to any district/pincode.

## Running Locally

- Run `npm install` to install npm dependencies
- Run `npm start` to start the server

## APIs

### Check and Notify for Washim District

- Route - `GET /api/check_and_notify_washim`
- Checks if any cowin slots available in Washim District, Maharashtra in week starting from today
- If available, then sends the alert to flock

### Start Scheduler

- Route - `GET /api/scheduler_start`
- Start scheduler which triggers the above API every 5 minutes

### Stop Scheduler

- Route - `GET /api/scheduler_stop`
- Stops above scheduler
