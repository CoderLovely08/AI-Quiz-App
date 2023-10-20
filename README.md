# Quiz Application

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Random Sampling of Questions](#random-sampling-of-questions)
   - [Fisher-Yates Shuffle Algorithm](#fisher-yates-shuffle-algorithm)
     - [How It Works](#how-it-works)
     - [Example Usage (JavaScript)](#example-usage-javascript)
     - [Usage](#usage-1)
     - [Considerations](#considerations)
7. [Contributing](#contributing)

---

## Introduction

The Quiz Application is a web-based platform designed to facilitate quiz creation, registration, login, quiz attempts, and score viewing. This application aims to provide users with an interactive way to engage with quizzes on various topics.

## Features

- User registration and login.
- Quiz creation and management by admins.
- User-friendly interface for quiz attempts.
- Score tracking and summary display.
- Secure authentication and data storage.

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- PostgreSQL Database server set up (local or cloud-based).
- Access to a web browser.

## Installation

To install the Quiz Application, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/CoderLovely08/AI-Quiz-App.git
```

2. Navigate to the project directory:

```bash
cd AI-Quiz-App
```

3. Install the dependencies:

```bash
npm install
```

## Usage

To start the application, run the following command:

```bash
npm start
```

Visit `http://localhost:3000` in your web browser to access the application.

## Random Sampling of Questions

### Fisher-Yates Shuffle Algorithm

The Fisher-Yates Shuffle Algorithm, also known as the Knuth Shuffle, is a simple and efficient method for randomly shuffling the elements of an array. It ensures that every permutation of the elements is equally likely, making it suitable for applications where true randomness is required.

#### How It Works

The algorithm operates in-place, meaning it modifies the original array. Here are the basic steps:

1. Start from the last element in the array.
2. Generate a random index between 0 and the current index (inclusive).
3. Swap the current element with the element at the randomly generated index.
4. Move to the previous element and repeat steps 2 and 3.

This process continues until you reach the first element in the array.

#### Example Usage (JavaScript)

```javascript
function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
```

#### Usage

1. Define the `fisherYatesShuffle` function in your code or include it from a library.
2. Call the function with an array as an argument.

```javascript
const myArray = [1, 2, 3, 4, 5];
const shuffledArray = fisherYatesShuffle(myArray);
console.log(shuffledArray);
```

#### Considerations

- This algorithm is suitable for scenarios where true randomness is required, such as shuffling a deck of cards or randomizing quiz questions.
- If you need to keep the original array intact, make a copy before applying the shuffle.

## Contributing

Contributions are welcome! Here are some ways you can contribute:

1. Fork the repository and make your changes.
2. Create a pull request with a detailed description of your changes.
3. Wait for your pull request to be reviewed and merged.

## License

This code is provided under the [MIT License](LICENSE).
