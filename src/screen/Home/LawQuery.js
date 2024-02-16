import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, Keyboard, K, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '../../constants/Color';
import { FontAwesome6 } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import { useDispatch, useSelector } from 'react-redux';
import { addString } from '../../../Redux/action';

const LawQuery = () => {


    // redux 
    const dispatch = useDispatch();
    const strings = useSelector((state) => state.strings);
    const [newString, setNewString] = useState('');

    const handleAddString = () => {

        if (newString) {
            dispatch(addString(newString));
            setNewString('');
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
    const RenderItem = ({ item }) => (
        <View style={{ backgroundColor: COLORS.purple, margin: 3, padding: 5, borderRadius: 4, width: "50%", marginLeft: "47%" }}>
            <Text style={{ textAlign: "left", color: COLORS.white, padding: 3 }}>{item.value}</Text>
        </View>
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
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
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
       
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);

        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
    }
    async function playRecording() {
        console.log('Playing recording..');
        await sound.playAsync();
    }

   // console.log(recording)

    return (

        < SafeAreaView style={{ marginTop: 30, flex: 1 }}>

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
                        <Button
                            title="Play Recording"
                            onPress={playRecording}
                        />
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