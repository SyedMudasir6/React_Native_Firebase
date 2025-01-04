import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  addUserData,
  deleteUser,
  getUsers,
  updateUser,
} from '../database/firestoreCRUD';

export default function UserCrud() {
  //State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  console.log('usersDataa',users)

  // Get User
  const fetchUsers = async () => {
    try {
    const userList = await getUsers();
    setUsers(userList);
    } catch (error) {
        Alert.alert('Error ', error.message);
    }
};
useEffect(()=> {
    fetchUsers();
}, []);

//post User
const handleSubmit = async () => {
  if(!name || !email || !phone){
      Alert.alert('Error', 'Please fill all the fields');
      return;
  }
  const userData = { name, email, phone };

  try {
      if(editId){
          await updateUser(editId, userData);
          Alert.alert('Success', 'User Updated Successfully');
      }
      else {
          await addUserData(userData);
          Alert.alert('Success', 'User Added Successfully');
      }
      setName('');
      setEmail('');
      setPhone('');
      setEditId(null);
      fetchUsers();
  } catch (error) {
      Alert.alert('Error', error.message);
  }
};

//Edit User
const handleEdit = (user) => {
  console.log('userEditttt??',user)
  setName(user.name);
  setEmail(user.email);
  setPhone(user.phone);
  setEditId(user.id);
};

//Delete User
const handleDelete = async (id) => {
  console.log('delete id',id)
  try {
     await deleteUser(id);
     Alert.alert('Success', 'User Deleted Successfully');
      fetchUsers();
  } catch (error) {
      Alert.alert('Error', error.message);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.txt}>{editId ? 'Edit User' : 'Add User'}</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          keyboardType="default"
          style={styles.textInput}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          style={styles.textInput}
          autoCapitalize="none"
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your number"
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.txtbtn}>
          <Text style={styles.txtSubmit}>
            {editId ? 'Update User' : 'Add User'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.dataContainer}>
            <Text style={styles.txt}>{item.name}</Text>
            <Text style={styles.txt}>{item.email}</Text>
            <Text style={styles.txt}>{item.phone}</Text>
            <View style={styles.containerlst}>
              <TouchableOpacity
                onPress={() => {
                  handleEdit(item);
                }}
                style={{
                  backgroundColor: 'green',
                  padding: 2,
                  borderRadius: 5,
                  marginRight: 2,
                }}>
                <Text style={styles.txtSubmit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDelete(item.id);
                }}
                style={{
                  backgroundColor: 'red',
                  padding: 2,
                  borderRadius: 5,
                  marginRight: 2,
                }}>
                <Text style={styles.txtSubmit}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No User Found</Text>}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  subContainer: {
    backgroundColor: 'white',
    padding: 8,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.8,
    borderRadius: 10,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    // flex:1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'gray',
    marginTop: 10,
  },
  txtbtn: {
    backgroundColor: 'blue',
    height: 40,
    marginTop: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },
  txtSubmit: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataContainer: {
    backgroundColor: 'white',
    padding: 4,
    marginTop: 5,
    borderRadius: 5,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.8,
    borderRadius: 10,
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerlst: {
    flexDirection: 'row',
  },
});
