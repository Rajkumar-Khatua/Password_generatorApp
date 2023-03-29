import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Form Validation
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, 'Length Of Password Should be min 6 characters')
    .max(32, 'Length Of Password Should be Maximum 6 characters')
    .required('Size can not be Null!'),
});
const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [emoji, setEmoji] = useState(false)
  const [hindi, setHindi] = useState(false)
  const [bengali, setBengali] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let charList = '';

    const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChar = 'abcdefghijklmnopqrstuvwxyz';
    const bengaliCase = 'অআইঈউঊঋঌএঐওঔংঃকখগঘঙচজঝঞটঠডঢণতথদধনপফবভমযরলশষসহঽড়ঢ়য়ঁংঃািীুূৃৄেৈোৌৗ্৲৴৺৹৸৶৷';
    // const emojiCase = '💎💍💄📿👞👟👠👡👢👑👒🎩🎓🧢⛑🎒🛍👝👜👛👚👙👘👗🧦🧥🗨🗯💭🕳👓🕶👔👕👖🧣🧤💬💫💨💥💦💣💢💤💌❣💟💕💖💗💙💚💛🧡💜🖤💝💞💔💓💘💋👄👅🧠👁️‍🗨️👁👀👨‍👦‍👦👨‍👧👨‍👧‍👦👨‍👧‍👧👩‍👦👩‍👦‍👦👩‍👧👩‍👧‍👦👩‍👧‍👧🤝👣👨‍👦👩‍👩‍👧‍👧👩‍👩‍👦‍👦👩‍👩‍👧‍👦👩‍👩‍👧👩‍👩‍👦👨‍👨‍👧‍👧👨‍👨‍👦‍👦👨‍👨‍👧‍👦👨‍👨‍👧👨‍👨‍👦👩‍❤️‍💋‍👩💑👩‍❤️‍👨👨‍❤️‍👨👩‍❤️‍👩👪👨‍👩‍👦👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍❤️‍💋‍👨👩‍❤️‍💋‍👨💏👭👬👫🤼‍♀️🤼‍♂️🤼🏍🏎🧟🧟‍♀️🧟‍♂️👯👯‍♂️👯‍♀️🗣👤👥🤺⛷🧞‍♂️🧞‍♀️🧞🙊🙈😾😿🙀😽😼💀☠👻👽👾🤖💩😺😸😹😻👺👹👿😈🤓🧐🤭🤫🤥🤡🤠😵😡😠🤬😷🤒🤕🤢🤮🤧😇🤪😳😱😰😬🤯😩😨😧😦😭😕🙃🤑😲☹🙁😖😞😟😤😢😔😓😒🤤😝😜😛😌😴😫😪🤨😐😑😶🙄😏😣😥😮🤐😯🤔🤩🤗🙂☺😚😙😗😘😍😎😀😁😂🤣😃😄😅😆😉😉😊😋';
    const hindiCase = 'अआइईउऊऋॠऌॡएऐओऔौोािीुूकखगघङचछजझञटठडढणतथदधनपफबभमक़ख़ग़ज़ड़ढ़फ़यरलळवहशषसऱऴঁংঃািীুূৃৄেৈোৌৗ্৲৴৺৹৸৶৷';
    const digitChars = '0123456789';
    const specialChar = '!@#$%^&*()_+`?/{}[]-=<>.,';

    if (upperCase) {
      charList += upperCaseChar;
    }
    if (lowercase) {
      charList += lowerCaseChar;
    }
    if (numbers) {
      charList += digitChars;
    }
    if (symbols) {
      charList += specialChar;
    }
    // if (emoji) {
    //   charList += emojiCase;
    // }
    if (hindi) {
      charList += hindiCase;
    }
    if (bengali) {
      charList += bengaliCase;
    }


    const passwordResult = createPassword(charList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };
  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={ styles.appContainer }>
        <View style={ styles.formContainer }>
          <Text style={ styles.title }>Password Generator!</Text>
          <Text style={ styles.subTitle }>Generate Your Favoroute Password</Text>
          <Formik
            initialValues={ { passwordLength: '' } }
            validationSchema={ PasswordSchema }
            onSubmit={ values => {
              console.log(values);
              generatePasswordString(Number(values.passwordLength)) // ToDo
            } }
          >
            { ({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleBlur,
              handleSubmit,
              handleReset,
              isSubmitting,

              /* and other goodies */
            }) => (
              <>
                <View style={ styles.inputWrapper }>
                  <View style={ styles.inputColumn }>
                    <Text style={ styles.heading }>Password Lenghth</Text>
                    { touched.passwordLength && errors.passwordLength &&
                      <Text style={ styles.errorText }>
                        { errors.passwordLength }
                      </Text>
                    }

                  </View>
                  <TextInput style={ styles.inputStyle }
                    value={ values.passwordLength }
                    onChangeText={ handleChange('passwordLength') }
                    placeholder="Ex: 6 - 16"
                    keyboardType='numeric'
                  />
                </View>
                <View style={ styles.inputWrapper }>
                  <Text style={ styles.heading }>Include Lower Case</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={ lowercase }
                    onPress={ () => setLowercase(!lowercase) }
                    fillColor="#29AB87"
                  />
                </View>
                <View style={ styles.inputWrapper }>
                  <Text style={ styles.heading }>Include UpperCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={ upperCase }
                    onPress={ () => setUpperCase(!upperCase) }
                    fillColor="#1B98F5"
                  />
                </View>
                <View style={ styles.inputWrapper }>
                  <Text style={ styles.heading }>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={ numbers }
                    onPress={ () => setNumbers(!numbers) }
                    fillColor="#2827CC"
                  />
                </View>
                <View style={ styles.inputWrapper }>
                  <Text style={ styles.heading }>Include Symbol's</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={ symbols }
                    onPress={ () => setSymbols(!symbols) }
                    fillColor="#3DBE29"
                  />
                </View>
                {/* <View style={ styles.inputWrapper }>
                  <Text style={ styles.heading }>Include Emoji's 😍</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={ emoji }
                    onPress={ () => setEmoji(!emoji) }
                    fillColor="#E8BD0D"
                  />
                </View> */}
                <View style={ styles.inputWrapper }>
                  <Text style={ styles.heading }>Include Bengali's 😍</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={ bengali }
                    onPress={ () => setBengali(!bengali) }
                    fillColor="#E03B8B"
                  />
                </View>
                <View style={ styles.inputWrapper }>
                  <Text style={ styles.heading }>Include Hindi's 😍</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={ hindi }
                    onPress={ () => setHindi(!hindi) }
                    fillColor="#EB4D4B"
                  />
                </View>



                <View style={ styles.formActions }>

                  <TouchableOpacity
                    disabled={ !isValid }
                    style={ styles.primaryBtn }
                    onPress={ handleSubmit }
                  >
                    <Text style={ styles.primaryBtnTxt }>Generate Password</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={ styles.secondaryBtn }
                    onPress={ () => {
                      handleReset();
                      resetPassword();
                    } }
                  >
                    <Text style={ styles.primaryBtnTxt }>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) }
          </Formik>
        </View>
        { isPasswordGenerated ? (<View style={ [styles.card, styles.cardElevated] }>
          <Text style={ styles.subTitle }>This Password For you: </Text>
          <Text style={ styles.description }>Hold on the text to Copy </Text>
          <Text selectable={ true } style={ styles.generatedPassword }>{ password }</Text>
        </View>) : null }
      </SafeAreaView>
    </ScrollView>
  );
};
export default App;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#46B2E0',
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '50%',
    borderRightWidth: .9,
    borderLeftWidth: .9,
    borderTopWidth: .9,
    borderBottomWidth: .9,
    borderRadius: 15,
    borderColor: '#696c6e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 35,
    marginHorizontal: 8,
    // backgroundColor: '#5DA3FA',
    borderRightWidth: .9,
    borderLeftWidth: .9,
    borderTopWidth: .9,
    borderBottomWidth: .9,
    borderColor: '#fff'
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 35,
    marginHorizontal: 8,
    backgroundColor: '#FF6666',
    alignItems:'center',
    justifyContent:'center'
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#08181f',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#ffffff',
  },
});
