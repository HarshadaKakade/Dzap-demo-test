import { ChangeEvent, KeyboardEvent } from 'react';
const ApplicationInputFiled = ({ value, onChnageInputField }: { value: string, onChnageInputField: (arg: string) => void}) => {
   const onChnageInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    onChnageInputField(value)
   }
   const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if(e.key === "Enter"){
        onChnageInputField(value)
    }
   }
    return (
        <div>
            <textarea className='w-screen bg-transparent outline-black text-white border-transparent focus:outline-none' value={value} onKeyDown={handleKeyDown} onChange={(e) => onChnageInputValue(e)} />
        </div>
    )
}

export default ApplicationInputFiled;
