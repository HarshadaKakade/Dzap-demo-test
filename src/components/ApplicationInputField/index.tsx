import { ChangeEvent, KeyboardEvent } from 'react';
const ApplicationInputFiled = ({ value, onChnageInputField }: { value: string, onChnageInputField: (arg: string, isNewAddress?:boolean) => void}) => {
   const onChnageInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    onChnageInputField(value)
   }
   const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if(e.key === "Enter"){
        onChnageInputField(value, true)
    }
   }
    return (
        <div>
            <textarea className='w-screen h-96 bg-transparent outline-black text-white border-transparent focus:outline-none' value={value} onKeyDown={handleKeyDown} onChange={(e) => onChnageInputValue(e)} />
        </div>
    )
}

export default ApplicationInputFiled;
