-- Create QuestionCategoryInfo Table
CREATE TABLE QuestionCategoryInfo (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Create QuestionsInfo Table
CREATE TABLE QuestionsInfo (
    question_id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    category_id INTEGER,
    is_training BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (category_id) REFERENCES QuestionCategoryInfo(category_id)
);

-- Create OptionsInfo Table
CREATE TABLE OptionsInfo (
    option_id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (question_id) REFERENCES QuestionsInfo(question_id)
);

-- Create UserInfo Table
CREATE TABLE UserInfo (
    user_id VARCHAR PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);

-- Create TestInfo Table
CREATE TABLE TestInfo (
    test_id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES UserInfo(user_id)
);

-- Create ResponseInfo Table
CREATE TABLE ResponseInfo (
    response_id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    question_id INTEGER NOT NULL,
    user_option_id INTEGER NOT NULL,
    test_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES UserInfo(user_id),
    FOREIGN KEY (question_id) REFERENCES QuestionsInfo(question_id),
    FOREIGN KEY (user_option_id) REFERENCES OptionsInfo(option_id),
    FOREIGN KEY (test_id) REFERENCES TestInfo(test_id)
);


CREATE TABLE ReportsInfo(
    report_id SERIAL PRIMARY KEY, 
    question_id INT NOT NULL, 
    report_description text, 
    user_id VARCHAR NOT NULL, 
    FOREIGN KEY (question_id) REFERENCES QuestionsInfo(question_id)
)