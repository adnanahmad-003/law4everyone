import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
const FindLawyerScreen = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
    { label: 'Assam', value: 'Assam' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Chhattisgarh', value: 'Chhattisgarh' },
    { label: 'Goa', value: 'Goa' },
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'Haryana', value: 'Haryana' },
    { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
    { label: 'Jharkhand', value: 'Jharkhand' },
    { label: 'Karnataka', value: 'Karnataka' },
    { label: 'Kerala', value: 'Kerala' },
    { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Manipur', value: 'Manipur' },
    { label: 'Meghalaya', value: 'Meghalaya' },
    { label: 'Mizoram', value: 'Mizoram' },
    { label: 'Nagaland', value: 'Nagaland' },
    { label: 'Odisha', value: 'Odisha' },
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Sikkim', value: 'Sikkim' },
    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
    { label: 'Telangana', value: 'Telangana' },
    { label: 'Tripura', value: 'Tripura' },
    { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { label: 'Uttarakhand', value: 'Uttarakhand' },
    { label: 'West Bengal', value: 'West Bengal' },
    { label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands' },
    { label: 'Chandigarh', value: 'Chandigarh' },
    { label: 'Dadra and Nagar Haveli and Daman and Diu', value: 'Dadra and Nagar Haveli and Daman and Diu' },
    { label: 'Lakshadweep', value: 'Lakshadweep' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Puducherry', value: 'Puducherry' }
  ]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#A87C7C' }}>
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select your state"
          style={{ width: "60%" }}
          dropDownContainerStyle={{ width: '60%' }}
        />
      </View>
    </View>
  )
}

export default FindLawyerScreen

const styles = StyleSheet.create({})