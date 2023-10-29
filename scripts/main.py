import pandas as pd
import psycopg2

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    database="yegbvjgn",
    user="yegbvjgn",
    password="PN21zQ63wQE-q6NNHmvFis87kem2hEg7",
    host="rain.db.elephantsql.com",
    port="5432"
)

# Create a cursor object
cur = conn.cursor()


df = pd.read_csv('scripts/final.csv')
print(df)

helperDict ={
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3
}

# Iterate through each row and insert into the database
for index, row in (df.iterrows()):
    question_text = row['question_text']
    options = [row['option_a'], row['option_b'], row['option_c'], row['option_d']]
    correct_option = options[helperDict[(row['answer'])]]
    print(options, correct_option)

    # Insert question into QuestionsInfo table
    # cur.execute(
    #     "INSERT INTO QuestionsInfo (question_text, category_id, is_training) VALUES (%s, %s, %s) RETURNING question_id",
    #     (question_text, 1, True)  # Assuming category_id for questions is 1 and they are for training
    # )
    # question_id = cur.fetchone()[0]

    # Insert options into OptionsInfo table
    for i, option_text in enumerate(options):
        is_correct = correct_option == option_text  # Convert ASCII value to character (A, B, C, D)
        print(option_text, is_correct)
        # cur.execute(
        #     "INSERT INTO OptionsInfo (question_id, option_text, is_correct) VALUES (%s, %s, %s)",
        #     (question_id, option_text, is_correct)
        # )

# Commit the changes
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()