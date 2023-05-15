import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {useState} from "react";



export default function App() {

  const { control, handleSubmit, formState: { errors }, resetField } = useForm({ defaultValues: {
      code: '',
    }});

  const [code,setCode] = useState(null)
    const [key,setKey] = useState(null)

    const magicResetNumber = 43210;
    const magicDeactivateNumber = 54321;
    const magicNumber = 32014;
    // const magicResetDec = 1473;

  const onSubmit = data => {
      setCode((magicDeactivateNumber - Number(data.code)) || magicNumber)
      setKey((magicResetNumber - Number(data.code)) || magicNumber)
  }

  const handleReset = () => {
      resetField("code")
      setCode(null)
      setKey(null)
  }

  const handleValidate = (value) => {
      if (value?.length !== 5) {
          return 'Must be five digits'
      }
      if (isNaN(Number(value)) || Number(value) >= magicResetNumber) {
          return 'Invalid argument'
      }
  }

  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('./assets/Agrosea_logo.png')}
        />

        {(!code || !key) &&
            <>
                <Text style={styles.title}>Enter trial key</Text>
                <Controller
                    control={control}
                    rules={{ required: 'The field is required', validate: handleValidate} }
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder={' X X X X X'}
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            keyboardType="numeric"
                            value={value}
                        />
                    )}
                    name="code"
                />
                {!!errors.code?.message &&  <Text style={styles.error}>{errors.code?.message}</Text>}
                <TouchableOpacity
                    style={styles.button}
                    title="Generate"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>Generate</Text>
                </TouchableOpacity>

            </>
        }

        {!!code &&
            <>
                <Text style={styles.title}>Key deactivation trial</Text>
                <Text style={styles.result}>{code}</Text>
            </>
        }
        {!!key &&
            <>
                <Text style={styles.title}>Key prolongation trial</Text>
                <Text style={styles.result}>{key}</Text>
            </>
        }

        {(!!code || !!key) &&
            <TouchableOpacity
                style={styles.button}
                title="Generate"
                onPress={handleReset}
            >
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#febe00',
    alignItems: 'center',
    justifyContent: 'start',
  },
    title:{
      marginTop:16,
      fontSize:40,
    },
    result:{
      fontSize:32,

    },
    input:{
        marginTop:16,
        fontSize:32,
        borderWidth: 2,
        width:300,
        borderRadius:5
    },
    button:{
      fontSize:32,
        borderWidth: 2,
        width:300,
        borderRadius:5,
        backgroundColor:'#333333',
        padding:8,
        marginTop:32,
        alignItems: 'center',
    },
    buttonText:{
      fontSize:24,
        color:'#fff',
    },
    error:{
      fontSize:20,
        color:'#900',
    },
    logo: {
        width: 380,
        height: 120,
        marginTop:80,
        marginBottom:80
    },
});
