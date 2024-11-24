import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// get all users
export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();

    return NextResponse.json(
      {
        success: true,
        data: accounts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// create a new user
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const validatedData = AccountSchema.parse(body);

    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });

    if (existingAccount) throw new ForbiddenError("Account already exists");

    const newAccount = await Account.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: newAccount,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
