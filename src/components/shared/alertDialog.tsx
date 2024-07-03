import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useEffect } from "react"
   
  export function AlertDialogConfirmation({open,onOpen,onConfirm,onCancel,eventData}:any) {
    useEffect(()=>{
        console.log("eventData",eventData)
    },[eventData])
    return (
      <AlertDialog open={open} onOpenChange={onOpen}>
        <AlertDialogTrigger asChild>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you want to update Appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently change Appointment Date and Time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>onCancel()}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>onConfirm(eventData.name,eventData.date,eventData.time,eventData.duration )}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }