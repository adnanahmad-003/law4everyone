import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, Keyboard, K, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '../../constants/Color';
import { FontAwesome6 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { addString } from '../../../Redux/action';
import { addStringAPI } from '../../../api/api';
import { AntDesign } from '@expo/vector-icons';
import {
    AndroidAudioEncoder,
    AndroidOutputFormat,
    IOSAudioQuality,
    IOSOutputFormat,
    Recording,
  } from 'expo-av/build/Audio';

const LawQuery = () => {

    const [play, setPlay] = useState(false);
    // redux 
    //const response = 'ans'
    const dispatch = useDispatch();
    const strings = useSelector((state) => state.strings);
    //console.log(strings);
    const [newString, setNewString] = useState('');
    const [newResponse, setNewResponse] = useState('');
    const handleAddString = async () => {
        if (newString) {
            try {
                const response = await addStringAPI(newString);
                console.log(response);
                setNewResponse(response);
                dispatch(addString(newString, response));
                setNewString('');
                setNewResponse('');
            } catch (error) {
                // Handle error here
                console.error('Error adding string:', error);
            }
        }
    };

    //language selector drropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'English', value: 'English' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Marathi', value: 'Marathi' },
        { label: 'Gujrati', value: 'Gujrati' }
    ]);

    //chats
    const RenderItem = ({ item }) => (<>
        <View style={{ backgroundColor: COLORS.purple, margin: 3, padding: 5, borderRadius: 4, width: "50%", marginLeft: "47%" }}>

            <Text style={{ textAlign: "left", color: COLORS.white, padding: 3 }}>{item.question}</Text>

        </View>
        <View style={{ backgroundColor: COLORS.purple, margin: 3, padding: 5, borderRadius: 4, width: "50%" }}>


            <Text style={{ textAlign: "left", color: COLORS.white, padding: 3 }}>{item.answer}</Text>
        </View>
    </>
    );

    const scrollViewRef = useRef();

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }

    }, []);


    //recording voice
    const [recording, setRecording] = useState(null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [sound, setSound] = useState(null);
    async function startRecording() {
        try {
            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                {
                    isMeteringEnabled: true,
                    android: {
                      ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
                      extension: '.wav',
                      outputFormat: AndroidOutputFormat.DEFAULT,
                      audioEncoder: AndroidAudioEncoder.DEFAULT,
                    },
                    ios: {
                      ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
                      extension: '.wav',
                      outputFormat: IOSOutputFormat.LINEARPCM,
                    },
                  }
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }


    //api call for recording
    async function uploadRecording() {
        try {
            const token = await SecureStore.getItemAsync('authToken');
            const uri = recording.getURI();
            console.log(uri,'1234')
            const formData = new FormData();
            formData.append('audioPrompt', {
                uri: uri,
                type: 'audio/mp4', // Adjust the type according to your audio format
                name: 'audioPrompt', // Adjust the name as needed
            });
            // Make the POST request
            const response = await fetch('http://localhost:3000/lawbot/convertAudio', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,

                },
            });

            const data = await response.json();
            console.log(data)
            console.log(data.message)
            if (data.message)
                return data.message; // Return the response data if needed

            else {
                return data.response;
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
            throw error; // Rethrow the error to handle it where the API function is called
        }
    }




    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
       // await uploadRecording();//api call
        const uri = recording.getURI();
       
        //console.log('Recording stopped and stored at', uri);
        await uploadRecording();

        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
    }


    async function playRecording() {
        setPlay(true);
        //console.log('Playing recording..');
        await sound.playAsync();
    }
    function stopPlayback() {
        setPlay(false)
        sound.stopAsync();
        //console.log('Playback stopped.');
    }
    // console.log(recording)

    return (

        < SafeAreaView style={{ marginTop: 10, flex: 1 }}>

            <View style={{ backgroundColor: COLORS.purple, padding: 8, marginHorizontal: 6, borderRadius: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select your language"
                        style={{ width: "60%" }}
                        dropDownContainerStyle={{ width: '60%', }}
                    />
                </View>

                <View><Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", marginRight: 10 }}>Ask your question</Text></View>
            </View>
            <View style={{}}>

                <ScrollView style={{ marginBottom: 150 }}
                    ref={scrollViewRef}
                    onContentSizeChange={() => {
                        if (scrollViewRef.current) {
                            scrollViewRef.current.scrollToEnd({ animated: true });
                        }
                    }}
                >
                    {strings.strings.map((item) => (
                        <RenderItem key={item.id} item={item} />
                    ))}

                    {sound && (
                        <View style={{ flexDirection: "row", marginLeft: "45%" }}>
                            <TouchableOpacity onPress={playRecording} style={{ backgroundColor: COLORS.purple, margin: 3, padding: 8, borderRadius: 13, width: "40%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <AntDesign name="play" size={24} color={play ? '#fff' : '#ff0000'} />
                                <Text style={{ color: COLORS.white }}>Play</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={stopPlayback} style={{ backgroundColor: COLORS.purple, margin: 3, padding: 8, borderRadius: 13, width: "40%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <AntDesign name="pausecircle" size={24} color={play ? '#ff0000' : '#fff'} />
                                <Text style={{ color: COLORS.white }}>Stop</Text>
                            </TouchableOpacity>
                        </View>
                    )}


                </ScrollView>
            </View>



            <View style={{
                flex: 1,
                height: 100,
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                bottom: 0,

            }}>

                <TouchableOpacity
                    onPress={recording ? stopRecording : startRecording}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: recording ? COLORS.red : COLORS.purple,


                    }} >
                    <FontAwesome6 name="microphone" size={22} color="white" />

                </TouchableOpacity>


                <View style={{ width: "79%", marginHorizontal: 5 }}>


                    <TextInput

                        style={{ backgroundColor: "white", padding: 8, borderRadius: 8, height: 45 }}
                        value={newString}
                        onChangeText={setNewString}
                        placeholder="Enter a new string"
                        onSubmitEditing={Keyboard.dismiss}

                    />



                </View>
                <TouchableOpacity style={{ width: 30, height: 30 }}><Button title="+" onPress={handleAddString} /></TouchableOpacity>
            </View>

        </SafeAreaView>


    )
}

export default LawQuery

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 40
    },
    fill: {
        flex: 1,
        margin: 15
    }
})