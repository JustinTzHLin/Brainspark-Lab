// Gemini response for Quizzes
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const GeminiApiKey = process.env.GEMINI_API_KEY;
if (typeof GeminiApiKey === "undefined")
  throw new Error("GEMINI_API_KEY is undefined");
const genAI = new GoogleGenerativeAI(GeminiApiKey);

export async function POST(req: Request) {
  try {
    // get the quiz from request
    const quizObject = (await req.json()).quizObject;
    console.log(quizObject);

    // declare model and prompt for Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      "I am making an online quiz taker, according to the question and the options, please generate some explanation for it. The question is: " +
      quizObject.question +
      " The correct answer is: " +
      quizObject.correct_answer +
      " The incorrect answers are: " +
      JSON.stringify(quizObject.incorrect_answers) +
      " The structure of yout answer should be like this: Explanation of question and correct_answer##Explanation of first_incorrect_answer##Explanation of second_incorrect_answer##etc. For example, if the question is 'What is the capital of Germany?', the correct answer is 'Berlin', the incorrect answers are ['Taipei', 'Tokyo', 'Paris'], the structure of your answer should be like this: As the capital of Germany, Berlin is the seat of the German government and a major cultural and economic center. It has a rich history, having served as the capital of various German states and empires throughout the centuries.##While Taipei is a significant city in Taiwan, it's not the capital of Germany. Taiwan is a separate country with its own capital, Taipei.##Tokyo is the capital of Japan, not Germany. It's a major global metropolis and a cultural hub.##Paris is the capital of France, another European country. It's famous for its art, fashion, and history.";

    // generate content and return response
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return NextResponse.json({ response: result.response.text(), status: 200 });
  } catch (err) {
    // handle error
    return NextResponse.json({
      log: `geminiController.getQuizInformation: ERROR ${err}`,
      message: {
        error: "Error occurred in geminiController.getQuizInformation.",
      },
      status: 500,
    });
  }
}
