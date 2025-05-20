{ name = "landingpage"
, dependencies =
  [ "aff", "effect", "halogen", "prelude", "web-dom", "web-html" ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
