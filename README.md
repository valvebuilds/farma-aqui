<h1>FarmaAqui</h1>
<p>Mobile App to check for prescription medication stock in local pharmacies. </p>

<h2>Overview</h2>

FarmaAqui is a mobile application developed for the Mobile App Course (Semester 2025-1) at Universidad Tecnológica de Pereira.

The primary goal of the application is to revolutionize the process of searching and locating medications within the city of Pereira, Risaralda. Instead of users having to physically visit or call multiple pharmacies to check the availability of their prescriptions, FarmaAqui provides a centralized, real-time system to verify stock across all registered pharmacies.

This solution ensures users can find all necessary items efficiently, saving time, effort, and frustration, especially in urgent situations.

<h2>Key Features</h2>

FarmaAqui is designed around five core functionalities:

<ul> 
  <li> Smart Medication Search: Allows users to search for medications by commercial name or active ingredient, with suggestion system and quick filtering. </li>
  <li> Dynamic Shopping Basket: Users can easily add desired medications to a temporary cart, similar to online shopping. The basket serves as the primary list for availability verification.
  <li> Availability Verification: Query the stock status of multiple pharmacies simultaneously. Results show which pharmacies have all or most of the required items. </li>
  <li> Integrated Map View (Pereira): A dedicated map view displays the location of all verified pharmacies. Provides directions and contact information for selected pharmacies.</li>
  <li> Turn Management: Enables users to plan their pickups ahead of time by scheduling a turn. This feature was mainly intended for users who claim their prescriptions under health insurance.
  <li> User Authentication & Persistence: Allows users to save frequently used medication lists or past searches.</li>
</ul>

<h2>Technical Stack</h2>

This project requires a robust architecture to handle real-time data and location services.

Mobile Frontend

Framework: React Native

Language: JavaScript

Backend & Database

Database: Firebase - Used for storing user data, pharmacy data, medication lists, and potentially real-time stock snapshots.

API & Services

Map Service: Google Maps Platform SDK (for map rendering and location services within Pereira).

External Data Integration: A simulated or real API endpoint to retrieve pharmacy stock data (Crucial for the "real-time" aspect).


<h2> Authors and Acknowledgments</h2>

Developers: Valerie Alvarez and Sebastian Quintero

Course: Mobile App Course (2025-1)

Professor: Luis Bernardo Zuluaga

Project Date: April 2025

Note on Data: For the purpose of this academic project, real-time integration with live pharmacy inventory systems is simulated. The application relies on a mock database of Pereira pharmacies and their fluctuating stock levels.
