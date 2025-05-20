module Main where

import Prelude
import Effect (Effect)
import Effect.Class (class MonadEffect)
import Effect.Aff (Aff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Aff as HA
import Halogen.VDom.Driver (runUI)
import Data.Eq (class Eq)

type State = 
  { currentPage :: Page }

data Page = Home | About | Documentation

derive instance eqPage :: Eq Page

data Action = 
  NavigateTo Page

component :: forall q i o. H.Component q i o Aff
component =
  H.mkComponent
    { initialState: const { currentPage: Home }
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

render :: forall m. State -> H.ComponentHTML Action () m
render state =
  HH.div
    [ HP.class_ (H.ClassName "app-container") ]
    [ renderNav state.currentPage
    , renderPage state.currentPage
    ]

renderNav :: forall m. Page -> H.ComponentHTML Action () m
renderNav currentPage =
  HH.nav
    [ HP.class_ (H.ClassName "main-nav") ]
    [ HH.div
        [ HP.class_ (H.ClassName "nav-content") ]
        [ HH.div
            [ HP.class_ (H.ClassName "logo") ]
            [ HH.text "NotSoUnusual" ]
        , HH.div
            [ HP.class_ (H.ClassName "nav-links") ]
            [ navLink Home "Home" currentPage
            , navLink About "About" currentPage
            , navLink Documentation "Documentation" currentPage
            ]
        ]
    ]

navLink :: forall m. Page -> String -> Page -> H.ComponentHTML Action () m
navLink page label currentPage =
  HH.a
    [ HP.class_ (H.ClassName $ "nav-link " <> if page == currentPage then "active" else "")
    , HE.onClick \_ -> NavigateTo page
    ]
    [ HH.text label ]

renderPage :: forall m. Page -> H.ComponentHTML Action () m
renderPage = case _ of
  Home ->
    HH.div
      [ HP.class_ (H.ClassName "hero-section") ]
      [ HH.div [ HP.class_ (H.ClassName "hero-content") ]
          [ HH.div [ HP.class_ (H.ClassName "hero-text") ]
              [ HH.h1_ [ HH.text "NotSoUnusual: AI-Powered Dynamic Text" ]
              , HH.p_ [ HH.text "A powerful React component that uses AI to dynamically transform text based on UTM parameters. Perfect for marketing campaigns and SEO optimization." ]
              , HH.button
                  [ HP.class_ (H.ClassName "button")
                  , HE.onClick \_ -> NavigateTo Documentation
                  ]
                  [ HH.text "Get Started" ]
              ]
          , HH.img
              [ HP.src "hero-ai.png"
              , HP.alt "AI robot with futuristic dashboard"
              , HP.class_ (H.ClassName "hero-image")
              ]
          ]
      ]
  
  About ->
    HH.div
      [ HP.class_ (H.ClassName "about-section") ]
      [ HH.h1_ [ HH.text "About NotSoUnusual" ]
      , HH.div
          [ HP.class_ (H.ClassName "about-content") ]
          [ HH.p_ [ HH.text "NotSoUnusual is an open-source React component that leverages AI to dynamically transform text content based on UTM parameters. It's designed for marketers, developers, and SEO professionals seeking to personalize content across various platforms without incurring additional costs." ]
          , HH.h2_ [ HH.text "Key Features:" ]
          , HH.ul_
              [ HH.li_ [ HH.text "AI-Powered Text Transformation: Utilizes the OpenRouter API to generate contextually relevant content." ]
              , HH.li_ [ HH.text "UTM Parameter Integration: Customizes content based on standard UTM parameters like utm_source, utm_medium, utm_campaign, and more." ]
              , HH.li_ [ HH.text "Seamless Integration: Compatible with React and Next.js frameworks." ]
              , HH.li_ [ HH.text "Real-Time Updates: Ensures content dynamically adapts to user interactions and campaign specifics." ]
              , HH.li_ [ HH.text "SEO Optimization: Generates unique, intent-matching content to enhance search engine rankings." ]
              ]
          , HH.h2_ [ HH.text "License:" ]
          , HH.p_ [ HH.text "This project is licensed under the MIT License, allowing for free use, modification, and distribution." ]
          , HH.h2_ [ HH.text "Championing Open-Source Solutions:" ]
          , HH.p_ [ HH.text "NotSoUnusual is part of a broader initiative to provide open-source alternatives to premium AI-driven content personalization tools. By offering a cost-effective and transparent solution, it empowers users to achieve dynamic content personalization without financial constraints, fostering innovation and collaboration within the developer community." ]
          , HH.h2_ [ HH.text "Get Started:" ]
          , HH.p_ [ HH.text "Install via npm:" ]
          , HH.pre_
              [ HH.code_
                  [ HH.span [ HP.class_ (H.ClassName "command") ] [ HH.text "npm install notsounusual" ]
                  ]
              ]
          , HH.p_ [ HH.text "Explore the documentation for integration guides and best practices." ]
          ]
      ]
  
  Documentation ->
    HH.div
      [ HP.class_ (H.ClassName "documentation-section") ]
      [ HH.h1_ [ HH.text "Documentation" ]
      , HH.div
          [ HP.class_ (H.ClassName "documentation-content") ]
          [ HH.div
              [ HP.class_ (H.ClassName "doc-section") ]
              [ HH.h2_ [ HH.text "Installation" ]
              , HH.div
                  [ HP.class_ (H.ClassName "code-block-container") ]
                  [ HH.pre_
                      [ HH.code_
                          [ HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "npm" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "command") ] [ HH.text "install" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "package") ] [ HH.text "notsounusual" ]
                          , HH.br_
                          , HH.span [ HP.class_ (H.ClassName "comment") ] [ HH.text "# or" ]
                          , HH.br_
                          , HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "yarn" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "command") ] [ HH.text "add" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "package") ] [ HH.text "notsounusual" ]
                          ]
                      ]
                  ]
              ]
          , HH.div
              [ HP.class_ (H.ClassName "doc-section") ]
              [ HH.h2_ [ HH.text "Basic Usage" ]
              , HH.div
                  [ HP.class_ (H.ClassName "code-block-container") ]
                  [ HH.pre_
                      [ HH.code_
                          [ HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "import" ]
                          , HH.text " { "
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "UnseenProvider" ]
                          , HH.text ", "
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "Unseen" ]
                          , HH.text " } "
                          , HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "from" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "string") ] [ HH.text "'notsounusual'" ]
                          , HH.text ";"
                          , HH.br_
                          , HH.br_
                          , HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "function" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "function") ] [ HH.text "App" ]
                          , HH.text "() {"
                          , HH.br_
                          , HH.text "  "
                          , HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "return" ]
                          , HH.text " ("
                          , HH.br_
                          , HH.text "    <"
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "UnseenProvider" ]
                          , HH.br_
                          , HH.text "      "
                          , HH.span [ HP.class_ (H.ClassName "prop") ] [ HH.text "apiKey" ]
                          , HH.text "="
                          , HH.span [ HP.class_ (H.ClassName "string") ] [ HH.text "\"your-openrouter-api-key\"" ]
                          , HH.br_
                          , HH.text "      "
                          , HH.span [ HP.class_ (H.ClassName "prop") ] [ HH.text "customPrompt" ]
                          , HH.text "="
                          , HH.span [ HP.class_ (H.ClassName "string") ] [ HH.text "\"Your custom prompt here\"" ]
                          , HH.br_
                          , HH.text "    >"
                          , HH.br_
                          , HH.text "      <"
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "Unseen" ]
                          , HH.text ">Default text</"
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "Unseen" ]
                          , HH.text ">"
                          , HH.br_
                          , HH.text "    </"
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "UnseenProvider" ]
                          , HH.text ">"
                          , HH.br_
                          , HH.text "  );"
                          , HH.br_
                          , HH.text "}" ]
                      ]
                  ]
              ]
          , HH.div
              [ HP.class_ (H.ClassName "doc-section") ]
              [ HH.h2_ [ HH.text "Advanced Usage with UTM Parameters" ]
              , HH.div
                  [ HP.class_ (H.ClassName "code-block-container") ]
                  [ HH.pre_
                      [ HH.code_
                          [ HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "import" ]
                          , HH.text " { "
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "UnseenProvider" ]
                          , HH.text ", "
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "Unseen" ]
                          , HH.text " } "
                          , HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "from" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "string") ] [ HH.text "'notsounusual'" ]
                          , HH.text ";"
                          , HH.br_
                          , HH.br_
                          , HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "function" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "function") ] [ HH.text "App" ]
                          , HH.text "() {"
                          , HH.br_
                          , HH.text "  "
                          , HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "const" ]
                          , HH.text " "
                          , HH.span [ HP.class_ (H.ClassName "variable") ] [ HH.text "customPrompt" ]
                          , HH.text " = "
                          , HH.span [ HP.class_ (H.ClassName "string") ] [ HH.text "`Create an engaging heading based on these UTM parameters: \n    utm_source=${utmParams.utm_source}, \n    utm_medium=${utmParams.utm_medium}, \n    utm_campaign=${utmParams.utm_campaign}, \n    utm_content=${utmParams.utm_content}`" ]
                          , HH.text ";"
                          , HH.br_
                          , HH.br_
                          , HH.text "  "
                          , HH.span [ HP.class_ (H.ClassName "keyword") ] [ HH.text "return" ]
                          , HH.text " ("
                          , HH.br_
                          , HH.text "    <"
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "UnseenProvider" ]
                          , HH.br_
                          , HH.text "      "
                          , HH.span [ HP.class_ (H.ClassName "prop") ] [ HH.text "apiKey" ]
                          , HH.text "="
                          , HH.span [ HP.class_ (H.ClassName "string") ] [ HH.text "\"your-openrouter-api-key\"" ]
                          , HH.br_
                          , HH.text "      "
                          , HH.span [ HP.class_ (H.ClassName "prop") ] [ HH.text "customPrompt" ]
                          , HH.text "={"
                          , HH.span [ HP.class_ (H.ClassName "variable") ] [ HH.text "customPrompt" ]
                          , HH.text "}"
                          , HH.br_
                          , HH.text "    >"
                          , HH.br_
                          , HH.text "      <"
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "Unseen" ]
                          , HH.text ">Default heading</"
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "Unseen" ]
                          , HH.text ">"
                          , HH.br_
                          , HH.text "    </"
                          , HH.span [ HP.class_ (H.ClassName "component") ] [ HH.text "UnseenProvider" ]
                          , HH.text ">"
                          , HH.br_
                          , HH.text "  );"
                          , HH.br_
                          , HH.text "}" ]
                      ]
                  ]
              ]
          ]
      ]

handleAction :: forall o. Action -> H.HalogenM State Action () o Aff Unit
handleAction = case _ of
  NavigateTo page ->
    H.modify_ \state -> state { currentPage = page }

main :: Effect Unit
main = HA.runHalogenAff do
  body <- HA.awaitBody
  runUI component unit body 