package com.attendance.backend.controller;

import com.attendance.backend.entity.Message;
import com.attendance.backend.service.MessageService;
import com.attendance.backend.security.JwtAuthenticationFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MessageController.class)
@AutoConfigureMockMvc(addFilters = false)
public class MessageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MessageService messageService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    public void testGetAllMessages_LegacyPath() throws Exception {
        Message msg = Message.builder()
                .id("1")
                .content("Test Message")
                .createdAt(LocalDateTime.now())
                .build();

        when(messageService.getAllMessages()).thenReturn(Arrays.asList(msg));

        mockMvc.perform(get("/api/public/messages")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("Test Message"));
    }

    @Test
    public void testGetAllMessages_NewPath() throws Exception {
        Message msg = Message.builder()
                .id("2")
                .content("New Path Message")
                .createdAt(LocalDateTime.now())
                .build();

        when(messageService.getAllMessages()).thenReturn(Arrays.asList(msg));

        mockMvc.perform(get("/api/messages")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("New Path Message"));
    }
}
