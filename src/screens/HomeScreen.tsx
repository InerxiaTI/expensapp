import React, { useContext} from 'react'
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native'
import ShoppingListCardComponent from '../components/ShoppingListCardComponent'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { AuthContext } from '../context/AuthContext'
import { useFetchShoppingLists } from '../hooks/shoppingList/useFetchShoppingLists'

const HomeScreen = () => {
  const {authState} = useContext(AuthContext);
  const user = authState.user
  
  const { isLoading, shoppingLists, 
    onRefresh, refreshing, onInfiniteScroll, totalElements, isLoadingInfinite} = useFetchShoppingLists(user!);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={'white'} size={20} />
      </View>
    )
  }

  return (
    <BaseScreenComponent style={{ paddingHorizontal: 10 }}>

      <Text style={{
        color: '#6B7280',
        fontSize: 18,
        fontWeight: 'normal',
        letterSpacing: 3,
        opacity: 0.7
      }}>Hola,</Text>

      <Text style={{
        color: '#6B7280',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 10
      }}>   {user?.nombres}</Text>
      {/* Header Home */}
      {/* <HeaderHomeComponent /> */}

      {/* FlatList de lista de compras */}
      <Text style={{
        color: '#6B7280',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginVertical: 10
      }}>Listas de compras ({totalElements})</Text>

      <View
        style={{
          flex: 1,
          borderColor: 'blue',
          borderWidth: 0,

        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shoppingLists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ShoppingListCardComponent buysList={item} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.35}
          onEndReached={onInfiniteScroll}
          ListFooterComponent={
            
            isLoadingInfinite
            ?
              <View
                style={{
                  height: 60,
                  width: '100%',
                  justifyContent: 'center'

                }}
              >
                <ActivityIndicator 
                  color={"red"}
                  size={30}
                />
              </View>
            : <></>
            
          }

        />
      </View>

    </BaseScreenComponent>
  )
}

export default HomeScreen