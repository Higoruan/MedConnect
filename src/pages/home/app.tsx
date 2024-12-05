import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const HomeScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>MedConnect</Text>
                <Text style={styles.subtitle}>
                    Sua saúde em boas mãos, sem complicações.
                </Text>
            </View>

            <View style={styles.section}>
                <Image
                    source={{ uri: 'https://img.icons8.com/?size=100&id=pU3aNENALH2e&format=png&color=000000' }}
                    style={styles.image}
                />
                <Text style={styles.sectionTitle}>Agendamento Simples</Text>
                <Text style={styles.sectionText}>
                    Agende suas consultas de forma rápida e fácil pelo nosso sistema.
                </Text>
            </View>

            <View style={styles.section}>
                <Image
                    source={{ uri: 'https://img.icons8.com/ios/100/28a745/stethoscope.png' }}
                    style={styles.image}
                />
                <Text style={styles.sectionTitle}>Acompanhe Suas Consultas</Text>
                <Text style={styles.sectionText}>
                    Visualize e gerencie seus agendamentos de forma intuitiva.
                </Text>
            </View>

            <View style={styles.section}>
                <Image
                    source={{ uri: 'https://img.icons8.com/?size=100&id=6az9wbEz5UKE&format=png&color=000000' }}
                    style={styles.image}
                />
                <Text style={styles.sectionTitle}>Encontre Especialistas</Text>
                <Text style={styles.sectionText}>
                    Agende com médicos e profissionais de saúde confiáveis.
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Desenvolvido para tornar sua experiência com saúde mais prática e eficiente.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#28a745',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
    section: {
        marginBottom: 30,
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});

export default HomeScreen;
