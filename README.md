# Hipcamp Test Calendar Question

## Overview

(Note: this is a proof of concept)

When campers want to make a booking at Hipcamp, they use a calendar to select dates.
Your task is to implement a feature in `src/Calendar.tsx` for blocking off days in the calendar
that have been reserved and are not bookable.

You have been provided with some scaffolding to help get you started.
You now need to implement the business logic for the `isDayBlocked` function.

Requirements:

- Any available day remains available
- Any reserved day in `campsiteReservedDays` cannot be selected as a check in day
- Any day after a reserved day cannot be selected as a check out day
- Any day after the first blocked check out day cannot be selected as a check out day

Dates are managed using the moment.js library. You may find this useful:
https://momentjs.com/docs/

## How to run the project

### `npm install`

Downloads dependecies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
