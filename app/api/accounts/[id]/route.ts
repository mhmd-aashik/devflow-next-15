import Account from "@/database/account.model";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema, UsersSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// GET /api/users/[id]
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();

    const account = await Account.findById(id);

    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        status: 200,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// DELETE /api/users/[id]
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();

    const account = await User.findByIdAndDelete(id);

    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        status: 200,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT /api/users/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account");

  try {
    await dbConnect();

    const body = await request.json();

    const validatedData = AccountSchema.partial().safeParse(body);

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const updatedAccount = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedAccount) throw new NotFoundError("User");

    return NextResponse.json(
      {
        status: 200,
        data: updatedAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}