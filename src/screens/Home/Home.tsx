import { MaterialIcons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Button, Image, ScrollView, Spinner, Text, VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import { Item, ItemProps } from "../../components/Item";
import { Tip } from "../../components/Tip";
import { api } from "../../services/api";
import { foodContains } from "../../utils/foodContains";

export function Home() {
  const [selectedImageUri, setSelectedImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [message, setMessage] = useState<string>();

  async function foodDetect(imageBase64: string | undefined) {
    const url = `/v2/models/${process.env.EXPO_PUBLIC_API_MODEL_ID}/versions/${process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID}/outputs`;

    const response = await api.post(url, {
      user_app_id: {
        user_id: process.env.EXPO_PUBLIC_API_USER_ID,
        app_id: process.env.EXPO_PUBLIC_API_APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: imageBase64,
            },
          },
        },
      ],
    });

    const foods = response.data.outputs[0].data.concepts.map(
      (concept: any) => ({
        name: concept.name,
        percentage: `${Math.round(concept.value * 100)}%`,
      })
    );

    const isVegetable = foodContains(foods, "beef");

    setMessage(
      isVegetable
        ? "Seu prato está dentro da dieta!"
        : "Adicione vegetais em seu prato!"
    );

    setItems(foods);
    setIsLoading(false);
  }

  async function handleSelectImage() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        Alert.alert(
          "É necessário conceder permissão para acessar o rolo da camera."
        );
      }

      setIsLoading(true);

      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (response.canceled) {
        setIsLoading(false);
        return;
      }

      if (!response.canceled) {
        const imgManipuled = await ImageManipulator.manipulateAsync(
          response.assets[0].uri,
          [{ resize: { width: 900 } }],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );
        setSelectedImageUri(imgManipuled.uri);
        await foodDetect(imgManipuled.base64);
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="white">
      <Button
        w={12}
        h={12}
        position={"absolute"}
        top={12}
        right={8}
        zIndex={100}
        bgColor={"green.600"}
        _pressed={{
          bgColor: "green.800",
        }}
        onPress={handleSelectImage}
        disabled={isLoading}
      >
        <MaterialIcons name="add-a-photo" color="#FFF" size={24} />
      </Button>

      <VStack flex={1} alignItems="center" justifyContent="center">
        {selectedImageUri ? (
          <Image
            source={{ uri: selectedImageUri }}
            flex={1}
            size={"100%"}
            resizeMode="cover"
            alt="foto"
          />
        ) : (
          <Text
            color={"green.600"}
            fontFamily={"Poppins_400Regular"}
            fontSize={14}
            textAlign="center"
          >
            Selecione a foto do seu prato para analizar.
          </Text>
        )}
      </VStack>

      <VStack
        bgColor="green.200"
        flex={1}
        borderTopLeftRadius={32}
        borderTopRightRadius={32}
        marginTop={-8}
        paddingTop={4}
        px={4}
        shadow={2}
      >
        {isLoading ? (
          <VStack flex={1} alignItems="center" justifyContent="center">
            <Spinner color={"green.600"} size="lg" />
          </VStack>
        ) : (
          <>
            {message && <Tip message={message} />}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 24 }}
            >
              <VStack flex={1} space={2} width={"100%"}>
                {items.map((item) => (
                  <Item key={item.name} data={item} />
                ))}
              </VStack>
            </ScrollView>
          </>
        )}
      </VStack>
    </VStack>
  );
}
