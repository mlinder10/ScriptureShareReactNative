import {
  Text,
  Modal,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { getBibleVersions } from "../config/helpers";
import { BiblesSchema } from "../config/schemas";
import { z } from "zod";
import { BookContext } from "../contexts/BookProvider";

type VersionModalProps = {
  visible: boolean;
  close: () => void;
};

export default function VersionModal({ visible, close }: VersionModalProps) {
  const { setBookData, chapter } = useContext(BookContext);
  const [versions, setVersions] = useState<z.infer<typeof BiblesSchema>[]>([]);

  async function fetchVersions() {
    try {
      const res = await getBibleVersions();
      if (res !== null) setVersions(res);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  function handleVersionChange(version: string) {
    setBookData(version, chapter);
    close();
  }

  useEffect(() => {
    if (visible) fetchVersions();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <Button title="X" onPress={close} />
      <ScrollView contentContainerStyle={styles.container}>
        {versions.map((v) => (
          <TouchableOpacity
            style={styles.version}
            key={v.id}
            onPress={() => handleVersionChange(v.id)}
          >
            <Text>{v.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
  version: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});
