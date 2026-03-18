package com.attendance.backend.controller;

import com.attendance.backend.entity.StudyDocument;
import com.attendance.backend.service.DocumentService;
import com.attendance.backend.security.JwtAuthenticationFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DocumentController.class)
@AutoConfigureMockMvc(addFilters = false)
public class DocumentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DocumentService documentService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    public void testGetAllDocuments_LegacyPath() throws Exception {
        StudyDocument doc = StudyDocument.builder()
                .id("1")
                .title("Test Doc")
                .fileUrl("http://example.com/doc")
                .uploadedAt(LocalDateTime.now())
                .build();

        when(documentService.getAllDocuments()).thenReturn(Arrays.asList(doc));

        mockMvc.perform(get("/api/public/documents")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Doc"));
    }

    @Test
    public void testGetAllDocuments_NewPath() throws Exception {
        StudyDocument doc = StudyDocument.builder()
                .id("2")
                .title("New Path Doc")
                .fileUrl("http://example.com/new")
                .uploadedAt(LocalDateTime.now())
                .build();

        when(documentService.getAllDocuments()).thenReturn(Arrays.asList(doc));

        mockMvc.perform(get("/api/documents")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("New Path Doc"));
    }
}
