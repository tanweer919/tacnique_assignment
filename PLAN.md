# Quiz App
Full-stack quiz application assignment

## Assumptions
- Only administrators can create new quizzes
- Users can take quizzes directly from the home screen
- Authentication is not required at this stage
- Users can take any quiz and submit answers, but results are not stored for future reference

## Scope
- Administrators create quizzes for users
- Users can take any quiz an unlimited number of times
- Backend architecture is designed to scale and handle concurrent users efficiently
- Frontend UI/UX prioritizes simplicity and ease of use

## Approach
- Backend and admin panel are implemented using Django
- Utilized packages including Django REST Framework and django-cors-headers for API endpoints and CORS handling
- Frontend is built with React and styled using Tailwind CSS
- Administrators log into the Django admin panel to create quizzes with various question types
- Users interact with the React application to browse and complete quizzes

## Reflection (Things I Would Implement With More Time)
- User authentication and account management
- Persistent storage of user quiz results and submission history
- Quick shareable quiz links for easy distribution
- Analytics dashboard showing quiz performance metrics
- Timed quiz mode with countdown functionality
- Question randomization to prevent answer memorization