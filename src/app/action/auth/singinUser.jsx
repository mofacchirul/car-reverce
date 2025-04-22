"use server";
import bcrypt from "bcrypt"
import bdconnect, { CollectionObjName } from "@/lib/bdConnect";

export const singinuser =async(payload)=>{
  const usercollection= bdconnect(CollectionObjName.usecollection);
  const {name, email, password, imageUrl} = payload;
 if(!name || !email || !password || !imageUrl) return null

  const user = await usercollection.findOne({email:payload.email});
  if(!user){
    const hashePassword = await bcrypt.hash(password,10)
    payload.password= hashePassword;
    const result = await usercollection.insertOne(payload)
    const {acknowledged, insertedId} = result;
    return  {acknowledged, insertedId:insertedId.toString()}
  }
   return {success: false}
    
}