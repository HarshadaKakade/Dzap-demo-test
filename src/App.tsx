import React, { useState } from 'react';
import ApplicationActionButton from './components/ApplicationActionButton';
import ApplicationAddress from './components/ApplicationAddress';
import ApplicationShowError from './components/ApplicationShowError';
import './App.css';


function App() {
  let [addresses, setAddress] = useState([{ label: "", value: "1", isActive: true }]);
  let [errorArray, setErrorArray] = useState<{
    label: string; value: string; isActive: boolean; labelLengthError: boolean;
    amountError: boolean; addressError: boolean; addressAndAmountError: boolean
  }[]>([],);
  let [duplicateAddresses, setDuplicateAddresses] = useState<{
    label: string; value: string; duplicateLineNo: string[]
  }[]>([],);
  let [disableNext, setNextDisable] = useState(false)

  const onChnageAddress = (value: string) => {
    let isAddNew = false
    let _address = addresses.map((data) => {
      if (data.isActive) {
        if (data.label === value) {
          isAddNew = true
          data.isActive = false
        } else {
          data.label = value
        }
      }
      return data
    })
    const newObject = {
      label: "",
      value: String(_address.length + 1),
      isActive: true
    }
    _address = isAddNew ? [..._address, newObject] : [..._address]

    setAddress(_address)
  }

  const onClickNextButton = () => {
    
    let addressError = addresses.map((data) => {
      const indexOfCommona = data.label.indexOf(",");
      const indexOfSpace = data.label.indexOf(" ");

      const addressAndAmount = indexOfCommona !== -1 ? data.label.split(",", 2)
        : indexOfSpace !== -1 ? data.label.split(" ")
          : data.label.split("=")
      let amount: number = +addressAndAmount[1]

      let details = {
        label: data.label,
        value: data.value,
        isActive: data.isActive,
        labelLengthError: false,
        amountError: false,
        addressError: false,
        addressAndAmountError: false
      }
      if (data.label.length < 42) {
        details.labelLengthError = true
      }
      if (addressAndAmount[0].startsWith('0x') === false) {
        details.addressError = true
      }
      if (isNaN(amount)) {
        details.amountError = true
      }
      if (details.addressError && details.amountError) {
        details.addressAndAmountError = true
      }
      return details
    })

    addressError = addressError.filter((data) => data.addressError || data.amountError)

    let duplicateAddress = addresses.reduce((acc: any, data) => {
      let details = {
        label: data.label,
        value: data.value,
        duplicateLineNo: []
      }
      const index = acc.find((amount: any) => amount.label === data.label)
      if (index === undefined) {
        acc.push(details)
      } else {
        acc = acc.map((duplicateAdd: any) => {
          if (duplicateAdd.label === data.label) {
            duplicateAdd.duplicateLineNo.push(data.value)
          }
          return duplicateAdd
        })
      }
      return acc
    }, [])
    duplicateAddress = duplicateAddress.filter((data:any) => data.duplicateLineNo.length !== 0)
    setErrorArray(addressError)
    setDuplicateAddresses(duplicateAddress)
    if(duplicateAddress.length !==0 || addressError.length !== 0){
      setNextDisable(true)
    }
    
  }

  const onClickKeepFirth = () => {
    let removeDuplicate = addresses.reduce((acc: any, data) => {
      const index = acc.find((amount: any) => amount.label === data.label)
      if (index === undefined) {
        acc.push(data)
      }
      return acc
    }, [])
    setAddress(removeDuplicate)
    setDuplicateAddresses([])
    setNextDisable(false)
  }

  return (
    <div className="App w-full h-screen  p-10">
      <ApplicationAddress options={addresses} onChnageAddress={onChnageAddress} />
      {
        errorArray.length !== 0 ?
          <ApplicationShowError errorArray={errorArray} isDuplicate={false} />
          : null
      }
      {
        errorArray.length === 0 && duplicateAddresses.length !== 0 ?
          <div>
            <div className="grid grid-cols-2 justify-items-start pt-5">
              <div><span className="font-bold text-white ">Duplicated</span></div>
              <div className="justify-self-end ">
                <span className='pr-5 border-r text-red-600 font-bold cursor-pointer border-red-600' onClick={onClickKeepFirth} >Keep the first one</span>
                <span className='pl-5 text-red-600 font-bold cursor-pointer' onClick={onClickKeepFirth}>Combine Balance</span>
              </div>
            </div>
            <ApplicationShowError errorArray={duplicateAddresses} isDuplicate={true} />
          </div>

          : null
      }

      <ApplicationActionButton name='Next' onClickButton={onClickNextButton} disableNext={disableNext}/>
    </div>
  );
}

export default App;
