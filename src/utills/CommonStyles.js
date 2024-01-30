import { StyleSheet } from 'react-native';
import { height, width } from './Dimension';

const CommonStyles = StyleSheet.create({
    marginLeft_1: {
        marginLeft: width(1)
    },
    marginLeft_2: {
        marginLeft: width(2)
    },
    marginLeft_3: {
        marginLeft: width(3)
    },
    marginLeft_4: {
        marginLeft: width(4)
    },
    marginLeft_5: {
        marginLeft: width(5)
    },
    marginRight_1: {
        marginRight: width(1)
    },
    marginRight_2: {
        marginRight: width(2)
    },
    marginRight_3: {
        marginRight: width(3)
    },
    marginRight_4: {
        marginRight: width(4)
    },
    marginRight_5: {
        marginRight: width(5)
    },
    marginTop_1: {
        marginTop: height(1)
    },
    marginTop_2: {
        marginTop: height(2)
    },
    marginTop_3: {
        marginTop: height(3)
    },
    marginTop_4: {
        marginTop: height(4)
    },
    marginTop_5: {
        marginTop: height(5)
    },
    marginBottom_1: {
        marginBottom: height(1)
    },
    marginBottom_2: {
        marginBottom: height(2)
    },
    marginBottom_3: {
        marginBottom: height(3)
    },
    marginBottom_4: {
        marginBottom: height(4)
    },
    marginBottom_5: {
        marginBottom: height(5)
    },
    paddingLeft_1: {
        paddingLeft: width(1)
    },
    paddingLeft_2: {
        paddingLeft: width(2)
    },
    paddingLeft_3: {
        paddingLeft: width(3)
    },
    paddingLeft_4: {
        paddingLeft: width(4)
    },
    paddingLeft_5: {
        paddingLeft: width(5)
    },
    paddingRight_1: {
        paddingRight: width(1)
    },
    paddingRight_2: {
        paddingRight: width(2)
    },
    paddingRight_3: {
        paddingRight: width(3)
    },
    paddingRight_4: {
        paddingRight: width(4)
    },
    paddingRight_5: {
        paddingRight: width(5)
    },
    paddingTop_1: {
        paddingTop: height(1)
    },
    paddingTop_2: {
        paddingTop: height(2)
    },
    paddingTop_3: {
        paddingTop: height(3)
    },
    paddingTop_4: {
        paddingTop: height(4)
    },
    paddingTop_5: {
        paddingTop: height(5)
    },
    paddingBottom_1: {
        paddingBottom: height(1)
    },
    paddingBottom_2: {
        paddingBottom: height(2)
    },
    paddingBottom_3: {
        paddingBottom: height(3)
    },
    paddingBottom_4: {
        paddingBottom: height(4)
    },
    paddingBottom_5: {
        paddingBottom: height(5)
    },
    row: {
        flexDirection: 'row'
    },
    rowAlignItemCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowJustifySpaceBtw: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
{/* <View style={{ flexDirection: "row" }}>
        <SearchableDropdown
          onItemSelect={onItemSelect}
          selectedItems={selectedItems}
          containerStyle={{ padding: 5 }}
          onRemoveItem={onRemoveItem}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "#white",
            borderColor: "#bbb",
            borderWidth: 1,
            width: width(95),
            borderRadius: 5,
          }}
          multi
          chip
          itemTextStyle={{ color: "#222" }}
          itemsContainerStyle={{
            position: "absolute",
            zIndex: 1,
            top: height(10),
            maxHeight: height(30),
            backgroundColor: "white",
            alignSelf: "center",
          }}
          items={items}
          defaultIndex={0}
          resetValue={false}
          textInputProps={{
            placeholder: "placeholder",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              width: width(95),
            },
            onTextChange: (text) => {},
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View> */}
export default CommonStyles;