import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface MedicoFormData {
  nomeCompleto: string;
  crm: string;
  especialidade: string;
  telefone?: string;
  email?: string;
}

const MedicoForm: React.FC = () => {
  const [formData, setFormData] = useState<MedicoFormData>({
    nomeCompleto: "",
    crm: "",
    especialidade: "",
    telefone: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigation = useNavigation();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nomeCompleto) {
      newErrors.nomeCompleto = "Nome completo é obrigatório";
    }

    if (!formData.crm || !/^\d{5,10}-[A-Za-z]{2}$/.test(formData.crm)) {
      newErrors.crm = "CRM inválido. Formato correto: 1234567-XX";
    }

    if (!formData.especialidade) {
      newErrors.especialidade = "Especialidade é obrigatória";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de e-mail inválido";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      Alert.alert("Sucesso", "Formulário enviado com sucesso!");
      setFormData({
        nomeCompleto: "",
        crm: "",
        especialidade: "",
        telefone: "",
        email: "",
      });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text>Nome Completo:</Text>
        <TextInput
          style={[styles.input, errors.nomeCompleto ? styles.inputError : null]}
          value={formData.nomeCompleto}
          onChangeText={(value) => handleInputChange("nomeCompleto", value)}
        />
        {errors.nomeCompleto && <Text style={styles.error}>{errors.nomeCompleto}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text>CRM:</Text>
        <TextInput
          style={[styles.input, errors.crm ? styles.inputError : null]}
          value={formData.crm}
          onChangeText={(value) => handleInputChange("crm", value)}
        />
        {errors.crm && <Text style={styles.error}>{errors.crm}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text>Especialidade:</Text>
        <TextInput
          style={[styles.input, errors.especialidade ? styles.inputError : null]}
          value={formData.especialidade}
          onChangeText={(value) => handleInputChange("especialidade", value)}
        />
        {errors.especialidade && <Text style={styles.error}>{errors.especialidade}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text>Telefone (opcional):</Text>
        <TextInput
          style={styles.input}
          value={formData.telefone}
          onChangeText={(value) => handleInputChange("telefone", value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>E-mail (opcional):</Text>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Cadastrar" color="green" onPress={handleSubmit} />
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Voltar" color="gray" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  buttonGroup: {
    marginTop: 20,
  },
});

export default MedicoForm;
