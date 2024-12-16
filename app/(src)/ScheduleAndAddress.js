import { StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from '../../components/Header';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { db } from '../../configs/FirebaseConfig'; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

const ScheduleAndAddress = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const route = useRoute();
    const { item } = route.params;
    const navigation = useNavigation();

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const showTimePicker = () => setTimePickerVisibility(true);
    const hideTimePicker = () => setTimePickerVisibility(false);
    const handleTimeConfirm = (time) => {
        setSelectedTime(time);
        hideTimePicker();
    };

    const handleRequest = async () => {
        if (!selectedDate || !selectedTime || !item.name || !address) {
            Alert.alert("Error", "Please fill in all fields: date, time, address, and worker.");
            return;
        }

        setIsLoading(true);

        const requestData = {
            date: selectedDate.toLocaleDateString(),
            time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            worker: item.name,
            address,
        };

        try {
            // Add request data to Firestore
            await addDoc(collection(db, "workerRequests"), requestData);

            Alert.alert("Request Sent", "Your request has been successfully sent!");
            navigation.navigate('(src)/Profile', { newRequest: requestData });
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert("Error", "Failed to send your request. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.innerContainer}>
                <View style={styles.card}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetails}>Price per Hour: ${item.price}</Text>
                    <Text style={styles.itemDetails}>Total: ${item.total}</Text>
                    <Text style={styles.itemDetails}>Experience: {item.experience} years</Text>
                </View>

                <TouchableOpacity onPress={showDatePicker} style={styles.inputContainer}>
                    <Text style={[styles.inputText, selectedDate && { color: '#000' }]}>
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                    </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                    display={Platform.OS === 'android' ? 'default' : 'spinner'}
                />

                <TouchableOpacity onPress={showTimePicker} style={styles.inputContainer}>
                    <Text style={[styles.inputText, selectedTime && { color: '#000' }]}>
                        {selectedTime
                            ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'Select Time'}
                    </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                    display={Platform.OS === 'android' ? 'default' : 'spinner'}
                />

                <TextInput
                    style={[styles.inputContainer, styles.textInput]}
                    placeholder="Enter Address"
                    placeholderTextColor="#888"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />

                <TouchableOpacity style={styles.button} onPress={handleRequest} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Send Request</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ScheduleAndAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    innerContainer: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    itemDetails: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    inputContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        borderColor: '#DDD',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    inputText: {
        fontSize: 16,
        color: '#888',
    },
    textInput: {
        color: '#000',
    },
    button: {
        backgroundColor: '#007FFF',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
