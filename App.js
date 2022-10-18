import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';



export default App = () => {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);
  
  
	const addData = (id) => {
		if(task){
			let input = { id: id, txt: task, isChecked: false }
			taskItems.push(input);
			setTask(null);
		}
	}
  

	const onLongPressHandler = (id) => {
		let taskItemsCopy = [...taskItems];
		taskItemsCopy.splice(id, 1);
		setTaskItems(taskItemsCopy);
	}
	const handleChange = (id) => {
		let temp = taskItems.map((product) => {
			if (id === product.id) {
				return { ...product, isChecked: !product.isChecked };
			}
			return product;
		});
		setTaskItems(temp);
	};


	const renderFlashList = (renderData) => {
		return (
			<FlatList
				data={renderData}
				estimatedItemSize={renderData.length}
				renderItem={({ item }) => (
					<TouchableOpacity
						onLongPress={onLongPressHandler}
						key={item.id}
					>
						<Card style={{ margin: 5 }}>
							<View style={styles.card}>
								<View
									style={{
										flexDirection: 'row',
										flex: 1,
										justifyContent: 'space-between',
									}}>
									<Checkbox
										value={item.isChecked}
										onValueChange={() => {
											handleChange(item.id);
										}}/>
									<Text 
										style={{
											marginRight:20, 
											marginLeft:8
										}}>{item.txt}</Text>
								</View>
							</View>
						</Card>
					</TouchableOpacity>
				)}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>My ToDo List</Text>
			<View style={{ flex: 1 }}>{renderFlashList(taskItems)}</View>
			<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.writeTaskWrapper}
			>
				<TextInput
					multiline={true}
					style={styles.input}
					placeholder={"Add new item"}
					value={task}
					onChangeText={(text) => setTask(text)}
				/>
				<TouchableOpacity onPress={() => addData(taskItems.length, task)}>
					<View style={styles.addWrapper}>
					<Text>ADD</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
		padding: 8,
	},
	sectionTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: "bold",
	},
	card: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	writeTaskWrapper: {
		position: "absolute",
		bottom:10,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	text: {
		textAlign: 'center',
		fontWeight: 'bold',
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: "lightgray",
		width: 260,
		borderRadius: 10,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: "lightgreen",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
});
