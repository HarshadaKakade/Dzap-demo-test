const ApplicationShowError = ({ errorArray, isDuplicate }: {
    errorArray: {
        label: string; value: string; isActive?: boolean; labelLengthError?: boolean;
        amountError?: boolean; addressError?: boolean; addressAndAmountError?: boolean,
        duplicateLineNo?: string[]
    }[], isDuplicate: boolean
}) => {

    return (
        <div className='show-address-error flex flex-cols border-4 border-red-600 text-red-600 p-3 mt-10'>
            <div className='flex flex-col gap-y-2'>
                <div className='h-8 w-8 rounded-full border-4 border-red-600 text-center mr-3'>!</div>
            </div>
            <div className='flex flex-col gap-y-2'>
                {
                    errorArray.map((data, index) => {
                        let msg: string;
                        if (isDuplicate) {
                            let lineNo = data.duplicateLineNo?.join(", ")
                            msg = data.duplicateLineNo?.length === 0 ? "" : `${data.label} duplicate in line: ${data.value}, ${lineNo}`
                        } else {
                            msg = data.addressAndAmountError ? `Line ${data.value} invalid Ethereum address and wrong amount`
                                : data.addressError ? `Line ${data.value} invalid Ethereum address`
                                    : data.amountError ? `Line ${data.value} wrong amount` : ""
                        }
                        return (
                            <div key={index}>
                                {msg}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ApplicationShowError;
