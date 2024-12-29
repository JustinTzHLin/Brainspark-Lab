import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    cookies().delete("brainspark-lab_user");
    return NextResponse.json({ result: true, status: 200 });
  } catch (err) {
    // handle error
    return NextResponse.json({
      log: `userController.logOut: ERROR ${err}`,
      message: {
        error: "Error occurred in userController.logOut.",
      },
      status: 500,
    });
  }
}
