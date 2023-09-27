import ApplicationInputFiled from '../ApplicationInputField';
const ApplicationAddress = ({ options, onChnageAddress }: { options: { label: string; value: string, isActive: boolean }[], onChnageAddress: (arg: string) => void }) => {

    const onChnageAddressFeild = (arg: string) => {
        onChnageAddress(arg)
    }
    return (
        <div className="application-address w-full pt-10 bg-transparent">
            <div className="application-title grid grid-cols-2 justify-items-start pb-5">
                <div><span className="font-bold text-white">Addresses with Amounts</span></div>
                <div className="justify-self-end text-white"><span>Upload File</span></div>
            </div>

            <div className='bg-black h-64 p-10 flex flex-cols'>
                <div className='py-2 flex flex-col pr-3 border-r gap-y-4'>
                    {
                        options.map((data, index) => {
                            return (
                                <span key={index} className='text-white inline-block h-2'>
                                    {data.value}
                                </span>
                            )
                        })
                    }
                </div>

                <div className=' py-2 flex flex-col pl-3 gap-y-4'>
                    {
                        options.map((data, index) => {
                            return (
                                <div key={index} className='flex-col h-2'>
                                    {
                                        data.isActive ?

                                            <ApplicationInputFiled value={data.label} onChnageInputField={onChnageAddressFeild} />

                                            : <span key={index} className='text-white'>
                                                {data.label}
                                            </span>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="application-title grid grid-cols-2 justify-items-start pt-7">
                <div><span className="font-bold text-white">Separated by ',' or '' or '='</span></div>
                <div className="justify-self-end text-white text-opacity-25"><span>Show Example</span></div>
            </div>

        </div>
    )
}

export default ApplicationAddress;