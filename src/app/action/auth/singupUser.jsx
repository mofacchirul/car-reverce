"use server"
import bcrypt from"bcrypt"
import bdconnect, { CollectionObjName } from "@/lib/bdConnect";
export const singinuser =async(payload)=>{
const {email,password} = payload;
const usercollection = bdconnect(CollectionObjName.usecollection);
const user = await usercollection.findOne({email});
if(!user) return null;
const ispassword = bcrypt.compare(user.password,password)
if(!ispassword) return null
 return user

}