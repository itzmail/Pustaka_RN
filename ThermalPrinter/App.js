import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import ThermalPrinterModule from 'react-native-thermal-printer';

const App = () => {
  useEffect(() => {
    getDevice();
  }, []);

  const text =
    '[C]<img>https://res.cloudinary.com/dvgiis6ey/image/upload/v1649315878/Work/LogoMutifGray_kdkh11.jpg</img>\n' +
    // '[L]\n' +
    // "[C]<font size='normal'>Jl. Raya Padalarang No.783, Ciburuy, Kec. Padalarang, Kabupaten Bandung Barat, Jawa Barat 40553\n</font>" +
    '================================';
  // '[L]\n';
  /* +
    '[L]<b>Baju Koko Putih</b>[R]Rp30,0000,00\n' +
    '[L]\n' +
    '[L]<b>Baju Gamis</b>[R]Rp50,000,00\n' +
    '[L]\n' +
    '[C]--------------------------------\n' +
    '[R]TOTAL PRICE :[R]Rp80,000,00\n' +
    '[L]\n' +
    '[C]]=========================\n' +
    '[L]\n' +
    '[L]\n' +
    "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
    "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>"; */

  async function printSomething() {
    try {
      console.log('Printer Running');
      await ThermalPrinterModule.printBluetooth({
        payload: text,
        macAddress: '66:22:5A:B0:B6:08',
        // printerWidthMM: 56,
        printerWidthMM: 50,
        printerNbrCharactersPerLine: 80,
        autoCut: false,
      });
      console.log('Printer Done');
    } catch (e) {
      console.log(e.message);
    }
  }

  async function getDevice() {
    try {
      const deviceList = await ThermalPrinterModule.getBluetoothDeviceList();
      console.log(deviceList);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        <Text style={styles.boxTitle.txtTitle}>
          Welcome to Try Thermal Printer
        </Text>
      </View>
      {/* <View style={styles.boxReceipt}>
        <View>
          <Image
            source={require('./LogoMutifGray.jpg')}
            style={{height: 75, width: 125}}
          />
        </View>
        <View>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            Jl. Raya Padalarang No.783, Ciburuy, Kec. Padalarang, Kabupaten
            Bandung Barat, Jawa Barat 40553
          </Text>
        </View>
        <View style={{marginVertical: 15}}>
          <Text style={{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>
            Bukti Pembayaran
          </Text>
          <Text style={{fontSize: 19, textAlign: 'center'}}>
            7 April 2022 13:09 WIB
          </Text>
        </View>
        <Image
          source={require('./Dash.jpg')}
          style={{width: '98%', height: 10}}
        />
        <View style={{marginVertical: 20, width: '95%'}}>
          <View style={{marginBottom: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 18}}>Baju Koko Putih</Text>
              <Text style={{fontSize: 18}}>x2</Text>
            </View>
            <Text style={{fontSize: 19}}>Rp130,000,00</Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20}}>Baju Gamis</Text>
              <Text style={{fontSize: 20}}>x1</Text>
            </View>
            <Text style={{fontSize: 19}}>Rp130,000,00</Text>
          </View>
        </View>
        <Image
          source={require('./Dash.jpg')}
          style={{width: '98%', height: 10, marginBottom: 20}}
        />
        <View style={{width: '98%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 23, fontWeight: '800'}}>Total Bayar</Text>
            <Text style={{fontSize: 23, fontWeight: '800'}}>Rp260,000,00</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18}}>dibayar</Text>
            <Text style={{fontSize: 18}}>Rp100,000,00</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18}}>kembalian</Text>
            <Text style={{fontSize: 18}}>Rp10,000,00</Text>
          </View>
        </View>
      </View> */}
      <View style={styles.boxButton}>
        <TouchableOpacity onPress={() => printSomething()}>
          <Text>Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  boxTitle: {
    flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',

    txtTitle: {
      fontSize: 25,
      fontWeight: '800',
    },
  },
  boxReceipt: {
    flex: 8,
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    padding: 20,
  },
  boxButton: {
    flex: 0.75,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
