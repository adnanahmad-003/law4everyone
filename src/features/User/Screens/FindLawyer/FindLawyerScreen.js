import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../../../../constants/Color";
import { EvilIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { Entypo } from "@expo/vector-icons";
const FilterModal = ({
  isOpen,
  onClose,
  predefinedExpertise,
  handleSelectPredefinedExpertise,
  expertise,
  handleRemoveExpertise,
  columns,
  handleFilter,
}) => {
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.modalTitle}>Filter based on Expertise</Text>
          </View>
          <View style={styles.predefinedExpertiseContainer}>
            {predefinedExpertise.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectPredefinedExpertise(item)}
              >
                <Text style={styles.predefinedExpertiseText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            key={columns}
            data={expertise}
            keyExtractor={(item, index) => index.toString()}
            style={styles.expertiseList}
            numColumns={columns}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleRemoveExpertise(item)}
                style={styles.expertiseItem}
              >
                <EvilIcons name="close-o" size={24} color="black" />
                <Text style={styles.expertiseItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleFilter}>
            <Text style={styles.submitButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const FindLawyerScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchMode, setSearchMode] = useState("normal");
  const [advancedSearchOption, setAdvancedSearchOption] = useState("userName");
  //expertise searching for
  const [expertise, setExpertise] = useState([]);
  const [advocatesList, setAdvocatesList] = useState([]);
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
  const [columns, setColumns] = useState(2);

  const handleSelectPredefinedExpertise = (item) => {
    setExpertise([...expertise, item]);
  };

  const handleRemoveExpertise = (itemToRemove) => {
    const updatedExpertise = expertise.filter((item) => item !== itemToRemove);
    setExpertise(updatedExpertise);
  };

  const searchNeabyAdvicate = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(
        `http://localhost:3000/user/nearbyAdvocates`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      console.log(data);
      setAdvocatesList(data.nearbyAdvocates);
      console.log(advocatesList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSearchByNearby = () => {
    searchNeabyAdvicate();
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
    {
      label: "Andaman and Nicobar Islands",
      value: "Andaman and Nicobar Islands",
    },
    { label: "Chandigarh", value: "Chandigarh" },
    {
      label: "Dadra and Nagar Haveli and Daman and Diu",
      value: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { label: "Lakshadweep", value: "Lakshadweep" },
    { label: "Delhi", value: "Delhi" },
    { label: "Puducherry", value: "Puducherry" },
  ]);
  const handleFilter = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(
        `http://localhost:3000/user/searchByLocation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ areaOfExpertise: expertise }),
        }
      );

      const data = await response.json();

      console.log(data);
      setAdvocatesList(data.nearbyAdvocates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //const [pincode, setPincode] = useState('');
  const [city, setCity] = useState("");

  const searchCityState = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(
        `http://localhost:3000/user/searchByLocation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ city: city, state: value }),
        }
      );

      const data = await response.json();

      console.log(data);
      setAdvocatesList(data.nearByAdvocates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Function to handle manual state and city entry
  const handleStateCitySubmit = () => {
    searchCityState();
    console.log("State:", value, "City:", city);
  };

  const searchByUserName = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(
        `http://localhost:3000/user/searchAdvocateByUserName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: searchText }),
        }
      );

      const data = await response.json();

      console.log(data);
      setAdvocatesList(data.advocate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //personalDetails.userName , name ,profileImage
  const searchByName = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(
        `http://localhost:3000/user/searchAdvocateByName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: searchText }),
        }
      );

      const data = await response.json();

      console.log(data);
      setAdvocatesList(data.advocate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdvancedSearch = () => {
    if (advancedSearchOption === "userName") {
      searchByUserName();
    } else if (advancedSearchOption === "name") {
      searchByName();
    }
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#7727C8" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setSearchMode("normal")}
          style={
            searchMode === "normal"
              ? styles.activeButton
              : styles.inactiveButton
          }
        >
          <Text style={styles.buttonText}>Normal Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSearchMode("advanced")}
          style={
            searchMode === "advanced"
              ? styles.activeButton
              : styles.inactiveButton
          }
        >
          <Text style={styles.buttonText}>Advanced Search</Text>
        </TouchableOpacity>
      </View>
      {searchMode === "normal" && (
        <View>
          <TouchableOpacity
            style={{ backgroundColor: "#fff", margin: 5, padding: 5 }}
            onPress={handleSearchByNearby}
          >
            <Text>Search nearby Advocate</Text>
          </TouchableOpacity>
          <View
            style={{
              marginBottom: 140,
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select your state"
                style={{ width: "95%" }}
                dropDownContainerStyle={{ width: "95%", height: "240%" }}
              />
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <TextInput
                style={styles.input}
                placeholder="Enter City"
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleStateCitySubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={closeFilterModal}
            predefinedExpertise={predefinedExpertise}
            handleSelectPredefinedExpertise={handleSelectPredefinedExpertise}
            expertise={expertise}
            handleRemoveExpertise={handleRemoveExpertise}
            columns={columns}
            handleFilter={handleFilter}
          />
        </View>
      )}

      {/* Advanced Search */}
      {searchMode === "advanced" && (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setAdvancedSearchOption("userName")}
              style={
                advancedSearchOption === "userName"
                  ? styles.activeButton
                  : styles.inactiveButton
              }
            >
              <Text style={styles.buttonText}>Search by UserName</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAdvancedSearchOption("name")}
              style={
                advancedSearchOption === "name"
                  ? styles.activeButton
                  : styles.inactiveButton
              }
            >
              <Text style={styles.buttonText}>Search by Name</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={{
              backgroundColor: "#fff",
              margin: 10,
              padding: 5,
              borderRadius: 4,
            }}
            placeholder={
              advancedSearchOption === "userName"
                ? "Enter UserName"
                : "Enter Name"
            }
            value={searchText}
            onChangeText={setSearchText}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAdvancedSearch}
          >
            <Text style={styles.submitButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}
      
        <View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={openFilterModal}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <FlatList
            data={advocatesList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  //navigate to AdvocatePage
                  console.log(navigate);
                }}
                style={{
                  backgroundColor: "#fff",
                  marginVertical: 5,
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "#000" }}>
                  {item.personalDetails.userName}
                </Text>
                <Text style={{ color: "#000" }}>
                  {item.personalDetails.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      
    </View>
  );
};

export default FindLawyerScreen;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 19,
  },
  submitButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 19,
    marginLeft: "40%",
    width: 100,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  activeButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "48%",
    alignItems: "center",
  },
  inactiveButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "48%",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  predefinedExpertiseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  predefinedExpertiseText: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 5,
    borderRadius: 5,
    color: "#000",
  },
  expertiseList: {
    paddingVertical: 10,
    borderColor: "#000",
    borderWidth: 2,
    marginVertical: 5,
  },
  expertiseItem: {
    marginHorizontal: 6,
    backgroundColor: "#f0f0f0",
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  expertiseItemText: {
    padding: 5,
  },
  closeButton: {
    marginLeft: "90%",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});