import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Keyboard,
  ScrollView,
  FlatList,
} from "react-native";
import { AdvocateSignup } from "./Modal";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../../../components/Input";
import Button from "../../../../components/Botton";
import COLORS from "../../../../constants/Color";
import Loader from "../../../../components/Loader";
import UploadProfile from "../../../../components/UploadProfile";
import UploadIdentity from "../../../../components/UploadIdentity";
import { EvilIcons } from "@expo/vector-icons";

const SignupLawyer = () => {


  //image 
  const [profileImageUri1, setProfileImageUri1] = useState('');
  const [profileImageUri2, setProfileImageUri2] = useState('');


  
  

  const [expertise, setExpertise] = useState([]);
  const [newExpertise, setNewExpertise] = useState("");
  const predefinedExpertise = [
    "Civil Law",
    "Criminal Law",
    "Corporate Law",
    "Corporate Law",
    "Tax Law",
    "Labor and Employment Law",
    "Intellectual Property Law",
    "Constitutional Law",
    "Environmental Law",
    "International Law",
    "Family Law",
    "Real Estate Law",
    "Banking and Finance Law",
  ];

  const handleAddExpertise = () => {
    if (newExpertise.trim() !== "") {
      setExpertise([...expertise, newExpertise.trim()]);
      setNewExpertise("");
    }
  };

  const handleSelectPredefinedExpertise = (item) => {
    setExpertise([...expertise, item]);
  };

  const handleRemoveExpertise = (itemToRemove) => {
    const updatedExpertise = expertise.filter((item) => item !== itemToRemove);
    setExpertise(updatedExpertise);
  };
  const [columns, setColumns] = useState(2);
  const [step, setStep] = useState(1);
  const [responseData, setResponseData] = useState(null);
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    username: "Adnan",
    email: "Adnan@gmail.com",
    fullname: "Adnan",
    phone: "1245678999",
    password: "1263889",
    registrationNumber: "Xe356y3",
    expertise: [],
    bio: "No bio",
    experience: "2",
    dateOfBirth:Date.now(),
    address:"some",
    nameOfUniversity:"rghhj",
    yearOfGraduation:"123",

  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);


  
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.registrationNumber) {
      handleError("Please Enter registration number", "registrationNumber");
      isValid = false;
    }

    if (!inputs.experience) {
      handleError(
        "Number of years of experience in legal practice",
        "experience"
      );
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };
    // Function to handle setting profile image URI for the first image
  const handleSetProfileImageUri1 = (uri) => {
    setProfileImageUri1(uri);
  };

  // Function to handle setting profile image URI for the second image
  const handleSetProfileImageUri2 = (uri) => {
    setProfileImageUri2(uri);
  };


  //upload details
  const register = async () => {
    setLoading(true);
    setLoading(true);
    try {
      const response = await AdvocateSignup(
        inputs,
        profileImageUri1,
        profileImageUri2
      );
      setLoading(false);

      console.log(response);
      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleNext = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }
    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }
    if (step === 1 && isValid) {
      setStep(2);
    }
    if (step === 2) {
      setStep(3);
    }
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  //console.log(profileImageUri1, '1');
 // console.log(profileImageUri2, '2');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Loader visible={loading} />
        <ImageBackground
          source={require("../../../../../assets/Images/Login.jpg")}
          style={{}}
        >
          <View style={{ marginTop: 80, marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 31,
                textAlign: "center",
                fontWeight: "600",
                color: COLORS.brown1,
              }}
            >
              Advocate Register
            </Text>

            {step === 1 && (
              <View style={{ marginTop: 50 }}>

                <Input
                  onChangeText={(text) => handleOnchange(text, "email")}
                  onFocus={() => handleError(null, "email")}
                  iconName="email-outline"
                  label="Email"
                  placeholder="Enter your email address"
                  error={errors.email}
                  placeholderTextColor="white" 
                />

                <Input
                  onChangeText={(text) => handleOnchange(text, "fullname")}
                  onFocus={() => handleError(null, "fullname")}
                  iconName="account-outline"
                  label="Full Name"
                  placeholder="Enter your full name"
                  error={errors.fullname}
                  placeholderTextColor="white" 
                />

                <Input
                  keyboardType="numeric"
                  onChangeText={(text) => handleOnchange(text, "phone")}
                  onFocus={() => handleError(null, "phone")}
                  iconName="phone-outline"
                  label="Phone Number"
                  placeholder="Enter your phone no"
                  error={errors.phone}
                  placeholderTextColor="white" 
                />

                <Input
                  onChangeText={(text) => handleOnchange(text, "password")}
                  onFocus={() => handleError(null, "password")}
                  iconName="lock-outline"
                  label="Password"
                  placeholder="Enter your password"
                  error={errors.password}
                  placeholderTextColor="white" 
                  password
                />

                <Button title="Next" onPress={handleNext} />
              </View>
            )}
            {step === 2 && (
              <View style={{ marginTop: 50, height: 620 }}>
                <Text
                  style={{
                    fontSize: 22,
                    textAlign: "center",
                    fontWeight: "300",
                    color: COLORS.brown1,
                    margin:10,
                  }}
                >
                  Upload Your Current Profile Picture
                </Text>
                <UploadProfile setImageUri={handleSetProfileImageUri1} />

                <Text
                  style={{
                    fontSize: 22,
                    textAlign: "center",
                    fontWeight: "300",
                    color: COLORS.brown1,
                    margin:10,
                  }}
                >
                  Upload Your ID
                </Text>
                <UploadIdentity setImageUri={handleSetProfileImageUri2}/>

                <Button title="Next" onPress={handleNext} />
              </View>
            )}
            {step === 3 && (
              <View style={{ marginTop: 50 }}>
                <Input
                  onChangeText={(text) =>
                    handleOnchange(text, "registrationNumber")
                  }
                  onFocus={() => handleError(null, "registrationNumber")}
                  iconName="camera-metering-partial"
                  label="Bar Council Registration Number"
                  placeholder="Enter your Bar Council Registration Number"
                  error={errors.registrationNumber}
                  placeholderTextColor="white" 
                />
                <Input
                  onChangeText={(text) => handleOnchange(text, "experience")}
                  onFocus={() => handleError(null, "experience")}
                  iconName="account-clock"
                  label="Practice years"
                  placeholder="Number of years of experience in legal practice"
                  error={errors.experience}
                  placeholderTextColor="white" 
                />
                <Input
                  onChangeText={(text) => handleOnchange(text, "bio")}
                  iconName="application-edit"
                  label="Profile bio"
                  placeholder="Write about yourself"
                  placeholderTextColor="white" 
                />
                <View>
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        textAlign: "left",
                        fontWeight: "600",
                        color: COLORS.brown1,
                        marginBottom: 10,
                       
                      }}
                    >
                      Select your Expertise
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: 10,
                    }}
                  >
                    {predefinedExpertise.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectPredefinedExpertise(item)}
                      >
                        <Text
                          style={{
                            padding: 10,
                            borderWidth: 1,
                            borderColor: COLORS.brown4,
                            margin: 5,
                            borderRadius: 5,
                            color: COLORS.brown1,
                            borderRadius:10
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                      style={{
                        color: COLORS.brown1,
                        height: 40,
                        borderColor: COLORS.brown1,
                        borderWidth: 2,
                        flex: 2,
                        paddingHorizontal: 10,
                      }}
                      placeholder="Add more expertise"
                      placeholderTextColor={COLORS.brown1}
                      value={newExpertise}
                      onChangeText={(text) => setNewExpertise(text)}
                      onSubmitEditing={handleAddExpertise}
                    />
                    <TouchableOpacity
                      style={{ backgroundColor: COLORS.purple }}
                      onPress={handleAddExpertise}
                    >
                      <Text style={{color: "#fff", padding: 10, flex: 1 ,backgroundColor:COLORS.brown1}}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <FlatList
                      key={columns}
                      data={expertise}
                      keyExtractor={(item, index) => index.toString()}
                      style={{
                        paddingVertical: 10,
                        borderColor: COLORS.brown1,
                        borderWidth: 2,
                        marginVertical: 5,
                      }}
                      numColumns={columns}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handleRemoveExpertise(item)}
                          style={{
                            marginHorizontal: 6,
                            backgroundColor: COLORS.brown6,
                            marginRight: 5,
                            marginBottom: 5,
                            borderRadius: 6,
                            flexDirection: "row",
                            
                            alignItems: "center",
                          }}
                        >
                          <EvilIcons name="close-o" size={24} color='#7f5539' />
                          <Text
                            style={{
                              padding: 5,
                              color:COLORS.brown1
                            }}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>

                <Button title="Register" onPress={validate} />
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <Text style={{ fontSize: 15, color: COLORS.brown4, marginBottom: 30 }}>
              Already have a account{" "}
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{ color: COLORS.brown1 }}>Login</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupLawyer;

const styles = StyleSheet.create({});