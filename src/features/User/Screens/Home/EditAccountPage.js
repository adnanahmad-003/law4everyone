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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../../../components/Input";
import Button from "../../../../components/Botton";
import COLORS from "../../../../constants/Color";
import Loader from "../../../../components/Loader";
import { EvilIcons } from "@expo/vector-icons";

const EditAccountPage = () => {
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
  const [step, setStep] = useState(3);
  const [responseData, setResponseData] = useState(null);
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    registrationNumber: "",
    expertise: [],
    bio: "No bio",
    experience: "",
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

  const register = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        inputs.expertise = expertise;
        const apiUrl = "https://your-api-endpoint.com/api";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });
        const jsonData = await response.json();
        setResponseData(jsonData);
        console.log(jsonData);
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 2000);
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
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

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
                color: "white",
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
                />

                <Input
                  onChangeText={(text) => handleOnchange(text, "fullname")}
                  onFocus={() => handleError(null, "fullname")}
                  iconName="account-outline"
                  label="Full Name"
                  placeholder="Enter your full name"
                  error={errors.fullname}
                />

                <Input
                  keyboardType="numeric"
                  onChangeText={(text) => handleOnchange(text, "phone")}
                  onFocus={() => handleError(null, "phone")}
                  iconName="phone-outline"
                  label="Phone Number"
                  placeholder="Enter your phone no"
                  error={errors.phone}
                />

                <Input
                  onChangeText={(text) => handleOnchange(text, "password")}
                  onFocus={() => handleError(null, "password")}
                  iconName="lock-outline"
                  label="Password"
                  placeholder="Enter your password"
                  error={errors.password}
                  password
                />

                <Button title="Next" onPress={handleNext} />
              </View>
            )}
            {step === 2 && (
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
                />
                <Input
                  onChangeText={(text) => handleOnchange(text, "experience")}
                  onFocus={() => handleError(null, "experience")}
                  iconName="account-clock"
                  label="Practice years"
                  placeholder="Number of years of experience in legal practice"
                  error={errors.experience}
                />
                <Input
                  onChangeText={(text) => handleOnchange(text, "bio")}
                  iconName="application-edit"
                  label="Profile bio"
                  placeholder="Write about yourself"
                />
                <View>
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        textAlign: "left",
                        fontWeight: "400",
                        color: "white",
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
                            borderColor: "gray",
                            marginBottom: 5,
                            borderRadius: 5,
                            color: "#fff",
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
                        color: "#fff",
                        height: 40,
                        borderColor: "#fff",
                        borderWidth: 2,
                        flex: 2,
                        paddingHorizontal: 10,
                      }}
                      placeholder="Add more expertise"
                      placeholderTextColor={"#fff"}
                      value={newExpertise}
                      onChangeText={(text) => setNewExpertise(text)}
                      onSubmitEditing={handleAddExpertise}
                    />
                    <TouchableOpacity
                      style={{ backgroundColor: COLORS.purple }}
                      onPress={handleAddExpertise}
                    >
                      <Text style={{ color: "#fff", padding: 10, flex: 1 }}>
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
                        borderColor: "#fff",
                        borderWidth: 2,
                        marginVertical: 5,
                      }}
                      numColumns={columns}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handleRemoveExpertise(item)}
                          style={{
                            marginHorizontal: 6,
                            backgroundColor: "#f0f0f0",
                            marginRight: 5,
                            marginBottom: 5,
                            borderRadius: 10,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <EvilIcons name="close-o" size={24} color="black" />
                          <Text
                            style={{
                              padding: 5,
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
            <Text style={{ fontSize: 15, color: "white", marginBottom: 30 }}>
              Already have a account{" "}
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{ color: "#7727C8" }}>Login</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAccountPage;

const styles = StyleSheet.create({});
