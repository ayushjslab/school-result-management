import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET () {
    try {
        const {data, error} = await supabase.from("schools").select("*")
        if(error) {
            return NextResponse.json({
                message: error.message || "There is some error",
                success: false, 
            }, {status: 400})
        }

        return NextResponse.json({
            message: "Schools fectched successfully",
            success: true,
            data
        }, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Internal server error",
            success: false
        }, {status: 500})
    }
}