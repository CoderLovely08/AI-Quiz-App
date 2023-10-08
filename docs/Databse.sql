CREATE TABLE "QuestionCategoryInfo"(
    "category_id" SERIAL,
    "category_name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "QuestionCategoryInfo" ADD PRIMARY KEY("category_id");
CREATE TABLE "OptionsInfo"(
    "option_id" SERIAL,
    "question_id" INTEGER NOT NULL,
    "option_a" VARCHAR(255) NOT NULL,
    "option_b" VARCHAR(255) NOT NULL,
    "option_c" VARCHAR(255) NOT NULL,
    "option_d" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "OptionsInfo" ADD PRIMARY KEY("option_id");
CREATE TABLE "TestInfo"(
    "test_id" SERIAL,
    "user_id" INTEGER NOT NULL
);
ALTER TABLE
    "TestInfo" ADD PRIMARY KEY("test_id");
CREATE TABLE "QuestionsInfo"(
    "question_id" SERIAL,
    "question_text" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_training" BOOLEAN NOT NULL
);
ALTER TABLE
    "QuestionsInfo" ADD PRIMARY KEY("question_id");
CREATE TABLE "AnswersInfo"(
    "answer_id" SERIAL,
    "question_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL
);
ALTER TABLE
    "AnswersInfo" ADD PRIMARY KEY("answer_id");
CREATE TABLE "UserInfo"(
    "user_id" INTEGER NOT NULL,
    "user_name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "UserInfo" ADD PRIMARY KEY("user_id");
CREATE TABLE "ResponseInfo"(
    "response_id" SERIAL,
    "user_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_option_id" INTEGER NOT NULL,
    "test_id" INTEGER NOT NULL
);

CREATE TABLE AdminInfo(admin_id SMALLSERIAL PRIMARY KEY, 
admin_name VARCHAR NOT NULL, 
admin_user_name VARCHAR NOT NULL, 
admin_password VARCHAR NOT NULL, 
created_at DATE DEFAULT NOW()
)

ALTER TABLE
    "ResponseInfo" ADD PRIMARY KEY("response_id");
ALTER TABLE
    "ResponseInfo" ADD CONSTRAINT "responseinfo_test_id_foreign" FOREIGN KEY("test_id") REFERENCES "TestInfo"("test_id");
ALTER TABLE
    "ResponseInfo" ADD CONSTRAINT "responseinfo_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "UserInfo"("user_id");
ALTER TABLE
    "AnswersInfo" ADD CONSTRAINT "answersinfo_question_id_foreign" FOREIGN KEY("question_id") REFERENCES "QuestionsInfo"("question_id");
ALTER TABLE
    "OptionsInfo" ADD CONSTRAINT "optionsinfo_question_id_foreign" FOREIGN KEY("question_id") REFERENCES "QuestionsInfo"("question_id");
ALTER TABLE
    "AnswersInfo" ADD CONSTRAINT "answersinfo_option_id_foreign" FOREIGN KEY("option_id") REFERENCES "OptionsInfo"("option_id");
ALTER TABLE
    "QuestionsInfo" ADD CONSTRAINT "questionsinfo_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "QuestionCategoryInfo"("category_id");
ALTER TABLE
    "ResponseInfo" ADD CONSTRAINT "responseinfo_question_id_foreign" FOREIGN KEY("question_id") REFERENCES "QuestionsInfo"("question_id");
ALTER TABLE
    "ResponseInfo" ADD CONSTRAINT "responseinfo_user_option_id_foreign" FOREIGN KEY("user_option_id") REFERENCES "AnswersInfo"("answer_id");